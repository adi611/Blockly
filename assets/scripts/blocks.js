var outputAnswer = "";

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
        .appendField(new Blockly.FieldDropdown([["What is the date today?","0"], ["What is the time now?","1"], ["How are you?","2"], ["What is JavaScript?","3"], ["What is your name?","4"]]), "DROPDOWN");
    this.setPreviousStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.JavaScript['bot'] = function(block) {
  var statements_bot = Blockly.JavaScript.statementToCode(block, 'BOT');
  return "redrawUi(0);";
};
Blockly.JavaScript['ask_me_a_question_'] = function(block) {
  var dropdown_dropdown = block.getFieldValue('DROPDOWN');
  var answer = [getDate(),
                getTime(),
                "I'm (not) fine",
                "According to MDN: JavaScript is a scripting or programming language"+ 
                "that allows you to implement complex features on web pages —"+ 
                "every time a web page does more than just sit there and display"+ 
                "static information for you to look at — displaying timely content updates,"+ 
                "interactive maps, animated 2D/3D graphics, scrolling video jukeboxes, etc. —"+ 
                "you can bet that JavaScript is probably involved."+ 
                "It is the third layer of the layer cake of standard web technologies,"+ 
                "two of which are (HTML and CSS)",
                "My name is Adi"];
  
  outputAnswer = answer[dropdown_dropdown];
  return "";
};

var workspace = Blockly.inject("blocklyDiv", {
  media: "assets/media/",
  toolbox: document.getElementById("toolbox"),
});

function getDate() {
  var today = new Date();
  var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();

  return date;

}

function getTime() {
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  return time;

}

function redrawUi(choice) {
  if (outputAnswer !== "") {
    $("#inputBox").text(outputAnswer);
  } else {
    $("#inputBox").text("");
  }
  // Remove blocks from workspace on reset
  if (choice==1) {
    workspace.clear();
  }
}

function runcode() {
  // Generate JavaScript code and run it.
  try {
    let code = Blockly.JavaScript.workspaceToCode(Blockly.workspace);
    eval(code);
    if(code===""){
      alert("First drag the Bot block from the toolbar");
    }
    else if(outputAnswer===""){
      alert("Drag the dropdown block from the toolbar into"+
            " the Bot block and then select one of the questions.");
    }
  } catch (e) {
    console.error(e);
  }
  
}

function reset() {
  outputAnswer = "";
  redrawUi(1);
}
