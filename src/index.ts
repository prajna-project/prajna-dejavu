import * as md5 from 'md5';

let time: number = +new Date();

function dejavu(ctx: any, next: any): any {
    let episodeId = 'episode-' + md5(time + '');
    let senceId = 'sence-' + md5(time + '');
    ctx.episodeId = ctx.runtime.episodeId = episodeId;
    ctx.senceId = ctx.runtime.senceId = senceId;

    if (ctx.state.error) {
        let new_time: number = +new Date();
        let senceId = 'sence-' + md5(time + '');
        ctx.senceId = ctx.runtime.senceId = senceId;
    }

    ctx.core.record = function () {
        // TODO:
    };

    ctx.core.finish = function () {
        // TODO:
    };

    next();
}

export default dejavu;
