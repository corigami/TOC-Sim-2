/* global $, Controller */
var View = function () {
    var self = this;

    var $main = $('#main');


    self.resetDisplay = function () {
        $main.text("The data has been reset");
    };

    self.getMain = function(){
        return $main;
    };



};

