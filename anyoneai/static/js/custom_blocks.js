Blockly.Blocks['download_kaggle'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Download Kaggle Dataset");
    this.appendValueInput("id")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("id");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['unzip'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Unzip");
    this.appendValueInput("id")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("filename");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['build_model'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Build Model");
    this.appendValueInput("layers")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("layers");
    this.appendValueInput("loss")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("loss");
    this.appendValueInput("optimizer")
        .setCheck(null) 
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("optimizer");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['_3_layer_covolution_2d'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("3 Layer Covolution 2D");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['single_neuron'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Single Neuron");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['binary_crossentropy'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Binary Crossentropy");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['categorical_crossentropy'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Categorical Crossentropy");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['rmsprop'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("RMSProp");
    this.appendDummyInput()
        .appendField("Learning Rate")
        .appendField(new Blockly.FieldNumber(-1, 0.01, Infinity, 5), "Learning Rate");
    this.setInputsInline(true);
    this.setColour(230);
    this.setOutput(true, null);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['adam'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Adam");
    this.appendDummyInput()
        .appendField("Learning Rate")
        .appendField(new Blockly.FieldNumber(-1, 0.01, Infinity, 5), "Learning Rate");
    this.setInputsInline(true);
    this.setColour(230);
    this.setOutput(true, null);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['train_with_images'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Train with images");
    this.appendValueInput("batch size")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("batch size");
    this.appendValueInput("image size")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("image size");
    this.appendValueInput("train folder")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("train folder");
    this.appendValueInput("validation folder")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("validation folder");
    this.appendValueInput("class mode")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("class mode");
    this.appendValueInput("epochs")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("epochs");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['save_model'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Save Model");
    this.appendValueInput("file name")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("file name");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

