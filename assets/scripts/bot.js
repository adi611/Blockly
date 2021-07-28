Blockly.Blocks['bot'] = {
  init: function() {
    this.appendStatementInput("BOT")
        .setCheck(null)
        .appendField("Bot");
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['ask_me_a_question_'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Ask me a question:")
        .appendField(new Blockly.FieldDropdown([["What is the date today?","a"], ["What is the time now?","b"], ["How are you?","c"], ["What is JavaScript?","d"], ["What is your name?","e"]]), "DROPDOWN");
    this.setPreviousStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};