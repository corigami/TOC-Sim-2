var Controller = function(_view) {
    var self = this;
    self.view = _view;

    self.resetAll = function(){
        self.view.resetDisplay();
        return true;
    };

    self.getView = function(){
        return self.view;
    };
};

$(document).ready(function () {
    document.controller = new Controller(new View());
});
