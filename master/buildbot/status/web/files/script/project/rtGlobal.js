define(['jquery', 'helpers'], function ($, helpers) {
    "use strict";
    var buildQueueTotal = $('#buildQueueTotal');
    var buildSlavesTotal = $('#buildSlavesTotal');
    var outerBar = $('#verticalProgressBar');
    var $buildLoadBox = $('#buildLoad');
    var infoSpan = $buildLoadBox.find('span');
    var $attentionBox = $('#attentionBox');

    var rtGlobal = {
        init: function () {
            requirejs(['realtimePages'], function (realtimePages) {
                var realtimeFunctions = realtimePages.defaultRealtimeFunctions();
                realtimePages.initRealtime(realtimeFunctions);
            });
        },
        processGlobalInfo: function (data) {
            console.log(helpers.isRealTimePage())
            if (helpers.isRealTimePage() === false) {
                $attentionBox.show();
            }
            buildQueueTotal.show();
            buildSlavesTotal.show();
            outerBar.show();
            $buildLoadBox.show();

            var slaveCount = data['slaves_count'];
            var slavesInUsePer = (data['slaves_busy'] / slaveCount) * 100.0;
            var slavesFree = slaveCount - data['slaves_busy'];
            var runningBuilds = data['running_builds'];
            var buildLoad = data['build_load'];

            helpers.verticalProgressBar(outerBar.children(), slavesInUsePer);
            outerBar.attr("title", "{0} builds are running, {1}, agents are idle".format(runningBuilds, slavesFree));

            buildSlavesTotal.text(slaveCount);
            infoSpan.text(buildLoad);
        }
    };

    return rtGlobal;
});