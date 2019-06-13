window.onload = function(){
    cc.game.onStart = function(){
        //load resources
        cc.LoaderScene.preload(g_resources, function () {
                cc.view.adjustViewPort(true)
                cc.view.setDesignResolutionSize(750, 1334, cc.ResolutionPolicy.SHOW_ALL)
                cc.view.resizeWithBrowserSize(true)
                var game = new MenuScene();
                cc.director.runScene(game);
        }, this);
    };
    cc.game.run("gameCanvas");
};