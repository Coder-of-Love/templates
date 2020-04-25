// TODO Ветвление на прод и дев
export const apiUrl = 'http://';

/*
**  UTIL
 */

export function formQuery(options = {}) {
	let result = '';
	for(let key in options)
		result += `${key}=${window.encodeURIComponent(options[key])}&`;

	return result;
}

export function getApiData({ url, format = 'json' }) {
	return fetch(url, { credentials: 'include' })
		.then(res => {
			if(res.ok)
				return res[format]();
			else
				throw res;
		})
		.catch(res => res.status);
}

export function postApiData({ url, body = {}, method = 'POST', format = 'json', withHeaders = false }) {
	return fetch(url, {
		credentials: 'include',
		method,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	})
		.then(res => {
			if(res.ok)
				return withHeaders ? {
					response: res[format](),
					headers: res.headers
				} : res[format]();
			else
				throw res;
		})
		.catch(res => res.status);
}

export function postApiFormData({ url, body, format = 'json', method = 'POST' }) {
	return fetch(url, {
		credentials: 'include',
		method,
		// headers: { 'Content-Type': 'multipart/form-data' },
		body
	})
		.then(res => {
			if(res.ok)
				return res[format]();
			else
				throw res;
		})
		.catch(res => res.status);
}