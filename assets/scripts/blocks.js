$(document).ready(function () {
  $("#runBtn").click(function () {
    runcode();
  });
  $("#resetBtn").click(function () {
    reset();
  });
});


Blockly.Blocks['bot'] = {
  init: function() {
    this.appendStatementInput("BOT")
        .setCheck(null)
        .appendField("Bot");
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


Blockly.JavaScript['bot'] = function(block) {
  var statements_bot = Blockly.JavaScript.statementToCode(block, 'BOT');
  // TODO: Assemble JavaScript into code variable.
  var code = statements_bot+';\n';
  return code;
};
Blockly.JavaScript['ask_me_a_question_'] = function(block) {
  var dropdown_dropdown = block.getFieldValue('DROPDOWN');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

var workspace = Blockly.inject("blocklyDiv", {
  media: "assets/media/",
  toolbox: document.getElementById("toolbox"),
});

function redrawUi() {
  if (typeof inputTextValue !== "undefined") {
    $("#inputBox").text(inputTextValue);
  } else {
    $("#inputBox").text("");
  }
}

function runcode() {
  // Generate JavaScript code and run it.
  var geval = eval;
  try {
    geval(Blockly.JavaScript.workspaceToCode(workspace));
  } catch (e) {
    console.error(e);
  }
  redrawUi();
}

function reset() {
  delete inputTextValue;
  redrawUi();
}
