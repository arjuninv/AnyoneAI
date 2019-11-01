Blockly.Python['download_kaggle'] = function(block) {
  var value_id = Blockly.Python.valueToCode(block, 'id', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = '{#add_to_top _import os}\nos.popen("kaggle datasets download -d ' + value_id + '")\n';
  return code;
};

Blockly.Python['unzip'] = function(block) {
  var value_id = Blockly.Python.valueToCode(block, 'id', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'os.popen("unzip '+ value_id +'")\n';
  return code;
};

Blockly.Python['build_model'] = function(block) {
  var value_layers = Blockly.Python.valueToCode(block, 'layers', Blockly.Python.ORDER_ATOMIC);
  var value_loss = Blockly.Python.valueToCode(block, 'loss', Blockly.Python.ORDER_ATOMIC);
  var value_optimizer = Blockly.Python.valueToCode(block, 'optimizer', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = '{#add_to_top _import tensorflow as tf}model = tf.keras.models.Sequential(['+ value_layers +'])\n' + '\nmodel.compile(loss=' + value_loss + ', optimizer=' + value_optimizer + ',metrics=["acc"])\n';
  return code;
};

Blockly.Python['_3_layer_covolution_2d'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = "tf.keras.layers.Conv2D(16, (3,3), activation='relu', input_shape=(256, 256, 3)), tf.keras.layers.MaxPooling2D(2, 2), tf.keras.layers.Conv2D(32, (3,3), activation='relu'), tf.keras.layers.MaxPooling2D(2,2), tf.keras.layers.Conv2D(32, (3,3), activation='relu'), tf.keras.layers.MaxPooling2D(2,2), tf.keras.layers.Flatten(), tf.keras.layers.Dense(512, activation='relu'), tf.keras.layers.Dropout(0.2), tf.keras.layers.Dense(1, activation='sigmoid')";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['single_neuron'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'tf.keras.layers.Dense(units=1, input_shape=[1])';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['binary_crossentropy'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = '"binary_crossentropy"';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['categorical_crossentropy'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = '"categorical_crossentropy"';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['rmsprop'] = function(block) {
  var number_learning_rate = block.getFieldValue('Learning Rate');
  var value_learning_rate = Blockly.Python.valueToCode(block, 'Learning Rate', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = '{#add_to_top _from tensorflow.keras.optimizers import RMSprop}RMSprop(lr=' + number_learning_rate   + ')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['adam'] = function(block) {
  var number_learning_rate = block.getFieldValue('Learning Rate');
  var value_learning_rate = Blockly.Python.valueToCode(block, 'Learning Rate', Blockly.Python.ORDER_ATOMIC);
  var code = '{#add_to_top _from tensorflow.keras.optimizers import Adam}Adam(lr=' + number_learning_rate   + ')';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['train_with_images'] = function(block) {
  var value_batch_size = Blockly.Python.valueToCode(block, 'batch size', Blockly.Python.ORDER_ATOMIC);
  var value_image_size = Blockly.Python.valueToCode(block, 'image size', Blockly.Python.ORDER_ATOMIC);
  var value_train_folder = Blockly.Python.valueToCode(block, 'train folder', Blockly.Python.ORDER_ATOMIC);
  var value_validation_folder = Blockly.Python.valueToCode(block, 'validation folder', Blockly.Python.ORDER_ATOMIC);
  var value_class_mode = Blockly.Python.valueToCode(block, 'class mode', Blockly.Python.ORDER_ATOMIC);
  var value_epochs = Blockly.Python.valueToCode(block, 'epochs', Blockly.Python.ORDER_ATOMIC);

  
  var code = '{#add_to_top _from tensorflow.keras.preprocessing.image import ImageDataGenerator}train_datagen = ImageDataGenerator(rescale=1/255)\ntest_datagen = ImageDataGenerator(rescale=1./255)\ntrain_generator = train_datagen.flow_from_directory(' + value_train_folder + ',target_size=(' + value_image_size + ', ' + value_image_size + '),batch_size=' + value_batch_size + ',class_mode=' + value_class_mode + ')\nvalidation_generator = test_datagen.flow_from_directory(' + value_validation_folder + ',target_size=(' + value_image_size + ', ' + value_image_size  + '),batch_size=' + value_batch_size + ',class_mode=' + value_class_mode + ')\nmodel.fit_generator(train_generator,epochs=' + value_epochs + ',validation_data=validation_generator)';
  return code;
};

Blockly.Python['save_model'] = function(block) {
  var value_file_name = Blockly.Python.valueToCode(block, 'file name', Blockly.Python.ORDER_ATOMIC);
  var code = 'model.save("' + value_file_name + '")\n';
  return code;
};