import json
import os
import shutil
from datetime import datetime

# os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
import tensorflow as tf
import tensorflow.keras as K
import tensorflowjs as tfjs
from absl import app
from absl import flags

FLAGS = flags.FLAGS
flags.DEFINE_integer('batch_size', 32, 'Batch size used for training/evaluation.')
flags.DEFINE_integer('train_steps', 1000, 'Number of training steps per epoch.')
flags.DEFINE_integer('epochs', 60, 'Number of training epochs.')
flags.DEFINE_integer('shuffle_size', 1000000, 'Buffer size used for shuffle in training.')
flags.DEFINE_float('learning_rate', 0.0001, 'Learning rate used for training.')
flags.DEFINE_alias('lr', 'learning_rate')
flags.DEFINE_bool('mixed_float16', False, 'Whether to use mixed precision.')
flags.DEFINE_string('predict', None, 'Do classification.')
flags.DEFINE_string('export', None, 'Export the model for TensorFlow.js.')

model_path = 'model_v1.5'
model_file = f'{model_path}/model.hdf5'


def main(argv):
    if len(argv) > 1:
        raise app.UsageError('Too many command-line arguments.')
    tf.get_logger().setLevel('WARNING')
    tf.autograph.set_verbosity(5)
    for gpu in tf.config.list_physical_devices('GPU'):
        tf.config.experimental.set_memory_growth(gpu, True)
    if FLAGS.mixed_float16:
        K.mixed_precision.set_global_policy(K.mixed_precision.Policy('mixed_float16'))

    if FLAGS.predict is not None:
        predicts = predict(json.loads(FLAGS.predict))
        print(predicts[0].numpy())
        print(tf.math.top_k(predicts[0], k=5).indices.numpy())
        return
    if FLAGS.export is not None:
        model = create_model(True)
        model.load_weights(model_file)
        tfjs.converters.save_keras_model(model, FLAGS.export)
        return

    model = create_model()
    model.summary()

    def _load_dataset(pattern, labeled=True, train=True):
        @tf.function
        def _parse_tfrecord(proto):
            formats = {'ink': tf.io.VarLenFeature(dtype=tf.float32)}
            if labeled:
                formats['class_index'] = tf.io.FixedLenFeature(1, dtype=tf.int64)
            features = tf.io.parse_single_example(proto, formats)
            inks = tf.reshape(tf.sparse.to_dense(features['ink']), (-1, 3))
            return (inks, features['class_index']) if labeled else inks

        ds = (tf.data.TFRecordDataset.list_files(pattern)
                .repeat()
                .interleave(tf.data.TFRecordDataset, num_parallel_calls=tf.data.AUTOTUNE)
                .map(_parse_tfrecord, num_parallel_calls=tf.data.AUTOTUNE)
                .prefetch(tf.data.AUTOTUNE)
                .shuffle(
                    FLAGS.shuffle_size if train else FLAGS.shuffle_size // 10,
                    reshuffle_each_iteration=True)
                .padded_batch(FLAGS.batch_size))
        ds.options().experimental_deterministic = False
        return ds

    train_ds = _load_dataset('dataset/training.tfrecord-?????-of-?????')
    validate_ds = _load_dataset('dataset/eval.tfrecord-?????-of-?????', train=False)

    def _lr(epoch):
        lr = FLAGS.learning_rate
        if epoch > 80:
            lr *= 1e-3
        elif epoch > 60:
            lr *= 5e-3
        elif epoch > 40:
            lr *= 5e-2
        elif epoch > 20:
            lr *= 5e-1
        print(f'learning rate: {lr}')
        return lr

    checkpoint = K.callbacks.ModelCheckpoint(
        model_file,
        monitor='val_accuracy',
        verbose=0,
        save_best_only=True,
        mode='max')
    csv_logger = K.callbacks.CSVLogger(
        f'{model_path}/model-{datetime.now().strftime("%Y-%m-%dT%H.%M.%S")}.csv')
    lr_scheduler = K.callbacks.LearningRateScheduler(_lr)

    # tf.profiler.experimental.server.start(6009)
    if os.path.exists(model_file):
        model.load_weights(model_file)
        mtime = datetime.fromtimestamp(os.path.getmtime(model_file)).strftime("%Y-%m-%dT%H.%M.%S")
        model_bak = f'{model_path}/model-{mtime}.hdf5'
        if not os.path.exists(model_bak):
            shutil.copy2(model_file, model_bak)
    model.fit(
        train_ds,
        validation_data=validate_ds,
        epochs=FLAGS.epochs,
        steps_per_epoch=FLAGS.train_steps,
        validation_steps=FLAGS.train_steps // 10,
        callbacks=(checkpoint, csv_logger, lr_scheduler))


def create_model(stateful=False):
    inputs = K.Input(
        shape=(1 if stateful else None, 3),
        batch_size=1 if stateful else FLAGS.batch_size)
    outputs = K.layers.BatchNormalization()(inputs)
    outputs = K.layers.Conv1D(48, 5, padding='same', activation='swish')(outputs)
    outputs = K.layers.BatchNormalization()(outputs)
    outputs = K.layers.Dropout(0.2)(outputs)
    outputs = K.layers.Conv1D(64, 5, padding='same', activation='swish')(outputs)
    outputs = K.layers.BatchNormalization()(outputs)
    outputs = K.layers.Dropout(0.2)(outputs)
    outputs = K.layers.Conv1D(96, 3, padding='same', activation='swish')(outputs)
    outputs = K.layers.Bidirectional(K.layers.LSTM(
        128,
        dropout=0.3,
        return_sequences=True,
        stateful=stateful))(outputs)
    outputs = K.layers.Bidirectional(K.layers.LSTM(
        128,
        dropout=0.3,
        return_sequences=True,
        stateful=stateful))(outputs)
    outputs = K.layers.Bidirectional(K.layers.LSTM(
        128,
        dropout=0.3,
        stateful=stateful))(outputs)
    outputs = K.layers.Dense(345, activation='softmax', dtype='float32')(outputs)
    model = K.Model(inputs=inputs, outputs=outputs)
    model.compile(
        optimizer='adam',
        loss='sparse_categorical_crossentropy',
        metrics=('accuracy',))
    return model


def predict(sketch):
    model = create_model()
    model.load_weights(model_file)
    return model.predict_step(tf.convert_to_tensor([sketch]))


if __name__ == '__main__':
    app.run(main)
else:
    FLAGS([__file__])
