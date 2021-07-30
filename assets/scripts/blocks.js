// variable to store the answer to the selected dropdown option
var outputAnswer = "";

$(document).ready(function () {
  $("#runBtn").click(function () {
    runcode();
  });
  $("#resetBtn").click(function () {
    reset();
  });
});

// Blockly code for Bot block
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

// Blockly code for "Ask me a question" dropdown block
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

// Blockly JS code for Bot block
Blockly.JavaScript['bot'] = function(block) {
  Blockly.JavaScript.statementToCode(block, 'BOT');

  // execute redrawUi(0) from the returned code so that dropdown doesn't work w/o it
  return "redrawUi(0);";
};

// Blockly JS code for "Ask me a question" dropdown block
Blockly.JavaScript['ask_me_a_question_'] = function(block) {

  // dropdown_dropdown stores values from 0 to 4 representing the selected dropdown option
  var dropdown_dropdown = block.getFieldValue('DROPDOWN');

  // answer array contains answers to each dropdown in order
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
  
  
  // stores answer to show to the user
  outputAnswer = answer[dropdown_dropdown];
  return "";
};

var workspace = Blockly.inject("blocklyDiv", {
  media: "assets/media/",
  toolbox: document.getElementById("toolbox"),
});

// Get the current date
function getDate() {
  var today = new Date();
  var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();

  return date;

}

// Get the current time
function getTime() {
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  return time;

}

// Here choice param tells us from where redrawUi() is called
// choice == 0 => Run ; choice == 1 => Reset
// As such clear workspace when Reset is clicked => choice == 1
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

    // If code is "" => Bot block is not dragged into the workspace
    if(code===""){
      alert("First drag the Bot block from the toolbar");
    }

    // Else if outputAnswer is "" => Bot block is dragged but dropdown block is not
    else if(outputAnswer===""){
      alert("Drag the dropdown block from the toolbar into"+
            " the Bot block and then select one of the questions.");
    }

  } catch (e) {
    console.error(e);
  }
  
}

function reset() {
  outputAnswer = "";  // Re-initialize outputAnswer to "" on Reset
  redrawUi(1);
}
