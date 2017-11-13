import * as md5 from 'md5';

let ts: number = +new Date();
let DEJAVU_FLAG: boolean = true;
let episodeId: string = md5('episode-' + ts + '');
let senceId: string = md5('sence-' + ts + '');

function dejavu(ctx: any, next: any): any {
    ctx.defineGetter('episodeId', episodeId);
    ctx.defineGetter('senceId', senceId);

    if (DEJAVU_FLAG) {
        DEJAVU_FLAG = false;
        ctx.core.on('ERROR', function () {
            let new_time: number = +new Date();
            senceId = 'sence-' + md5(new_time + '');
            ctx.defineGetter('senceId', senceId);
        });

        ctx.core.record = function () {
            let new_time: number = +new Date();
            senceId = 'sence-' + md5(new_time + '');
            ctx.defineGetter('senceId', senceId);

            ctx.report({
                level: 'INFO',
                name: 'prajna-dejavu-record',
                content: 'start recording'
            });
        };

        ctx.core.finish = function () {
            let new_time: number = +new Date();
            senceId = 'sence-' + md5(new_time + '');
            ctx.defineGetter('senceId', senceId);

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
