//封装get 和 post 请求
import service from './service';
export function get(url, params) {
    const config = {
        method: 'get',
        url,
    };
    if (params) config.params = params;
    return service(config);
}
export function post(url, data) {
    const config = {
        method: 'post',
        url,
    };
    if ( data ) config.data = data;
    return service( config );
}