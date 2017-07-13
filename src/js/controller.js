var Controller = function(_view) {
    var self = this;
    self.view = _view;
    self.scenarios = [];
    self.model = new LocalModel(self.scenarios);


    self.resetAll = function(){
        self.view.resetDisplay();
        return true;
    };

    self.getView = function(){
        return self.view;
    };

    self.getScenarios = function(){
        return self.scenarios;
    }

    self.setModel = function(model){
        self.model = model;
    }

    self.getModel = function(){
        return self.model;
    }

    self.getModelName = function(){
        return self.model.getName();
    }
};

/*
$(document).ready(function () {
    document.controller = new Controller(new View());
});
*/
