import { goto } from '$app/navigation';
import { assets, base } from '$app/paths';
import { getRootApi, getToken, _get } from '$lib/page';

export async function load({ fetch, params, url }) {
    var token = getToken();
    let category_name = params.category_name;
    // let id = _get('id');
    // if (!id) {
    //     console.log(id);
    //     id = 'test.com';
    // }
    let rs = {
        category_name: category_name,
        project_site_contacts: [],
    }
    //let data_ajax = {token, token, action: 'load_page', id: id};
    //window.$.ajax({
    //    async: false,
    //    url: getRootApi() + '/page/site_detail.php',
    //    method: 'post',
    //    data: data_ajax,
    //    success(res) {
    //        try {
    //            res = JSON.parse(res);
    //            if (typeof res.data == 'object') {
    //                rs = Object.assign(rs, res.data);
    //            }
    //        } catch (error) {
    //            console.log(res);                
    //        }
    //    }
    //})

    return rs;
};