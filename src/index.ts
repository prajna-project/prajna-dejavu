import * as md5 from 'md5';

let time: number = +new Date();
let DEJAVU_FLAG: boolean = true;

function dejavu(ctx: any, next: any): any {
    let episodeId = 'episode-' + md5(time + '');
    let senceId = 'sence-' + md5(time + '');
    ctx.episodeId = ctx.runtime.episodeId = episodeId;
    ctx.senceId = ctx.runtime.senceId = senceId;

    if (DEJAVU_FLAG) {
        DEJAVU_FLAG = false;
        ctx.core.on('ERROR', function () {
            let new_time: number = +new Date();
            let senceId = 'sence-' + md5(new_time + '');
            ctx.senceId = ctx.runtime.senceId = senceId;
            console.log('senceId is: ', ctx.senceId);
        });

        ctx.core.record = function () {
            let new_time: number = +new Date();
            let senceId = 'sence-' + md5(new_time + '');
            ctx.senceId = ctx.runtime.senceId = senceId;

            ctx.report({
                level: 'INFO',
                name: 'prajna-dejavu-record',
                content: 'start recording'
            });
        };

        ctx.core.finish = function () {
            let new_time: number = +new Date();
            let senceId = 'sence-' + md5(new_time + '');
            ctx.senceId = ctx.runtime.senceId = senceId;

            ctx.report({
                level: 'INFO',
                name: 'prajna-dejavu-finish',
                content: 'finish recording'
            });
        };
    }

    next();
}

export default dejavu;
