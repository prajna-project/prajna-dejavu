import * as md5 from 'md5';

let time: number = +new Date();
let DEJAVU_FLAG: boolean = true;
let episodeId = 'episode-' + md5(time + '');
let senceId = 'sence-' + md5(time + '');

function dejavu(ctx: any, next: any): any {
    ctx.setKey('episodeId', episodeId);
    ctx.setKey('senceId', senceId);

    if (DEJAVU_FLAG) {
        DEJAVU_FLAG = false;
        ctx.core.on('ERROR', function () {
            let new_time: number = +new Date();
            senceId = 'sence-' + md5(new_time + '');
            ctx.setKey('senceId', senceId);
        });

        ctx.core.record = function () {
            let new_time: number = +new Date();
            senceId = 'sence-' + md5(new_time + '');
            ctx.setKey('senceId', senceId);

            ctx.report({
                level: 'INFO',
                name: 'prajna-dejavu-record',
                content: 'start recording'
            });
        };

        ctx.core.finish = function () {
            let new_time: number = +new Date();
            senceId = 'sence-' + md5(new_time + '');
            ctx.setKey('senceId', senceId);

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
