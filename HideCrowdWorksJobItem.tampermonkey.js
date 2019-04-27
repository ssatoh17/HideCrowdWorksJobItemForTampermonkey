// ==UserScript==
// @name         クラウドワークスに案件非表示機能を追加
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       ssatoh17
// @match        https://crowdworks.jp/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @grant        none
// ==/UserScript==

var $ = window.jQuery;
var $２０３ = $.noConflict(true);

// 非表示にするジョブID（配列）
const hiddenIDs = JSON.parse(localStorage.hiddenIDs || '[]');

(function($){
    'use strict';

    // https://qiita.com/hisashi_matsui/items/8a8971acf5ba63e5cc7a
    function addHiddenID(_id) {
        hiddenIDs.push(_id);
        localStorage.hiddenIDs = JSON.stringify(hiddenIDs);
    }

    // 「非表示」ボタンを追加（案件(li)毎に）
    let 案件内ボタンセットs = $('div.controllers.actions.meta_column');
    案件内ボタンセットs.each(function(i,elm){
        let jobID = $(this).parent().parent().find('.job_data_row h3 > a').attr('href').replace('/public/jobs/','');
        if(hiddenIDs.indexOf(jobID)>=0) $(this).closest('li').hide();
        //案件内ボタンリスト内に非表示ボタンを追加
        $(this).append('　<a class="cw-button cw-button_xs 非表示" id="'+jobID+'" style="background:lightgoldenrodyellow;border-bottom-width: 2px; border-right-width: 2px;">非表示</a>');
    });

    $('a.非表示').on('click',function(e){
        console.log(e);
        console.log(e.toElement.id);
        addHiddenID(e.toElement.id);
        $(this).closest('li').hide(); // 直近の親の li を非表示に
    });

    // 案件を非表示に
    $('ul.jobs_lists>li').each(function(i,elm){
        // idが非表示IDリストに含まれていたら非表示にする
        let _jobID = $(this).attr('data-job_offer_id');
    });

})($２０３)
