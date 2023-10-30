import axios from 'axios';
import * as cheerio from 'cheerio';
export async function GET(req) {
	const url =
		'https://sonongnghiep.angiang.gov.vn/wps/portal/Home/2018/home/tin-chi-tiet/sa-xuctienthuongmai/sa-giacattsanpham/nongsanangiang2023#gsc.tab=0';

	const { data } = await axios.get(url);
	const $ = cheerio.load(data);

	const rows = [];

	// Get headers
	const headers = [];
	$('table tr:nth-child(1) td').each((_, td) => {
		headers.push($(td).text().replace(/\n/g, '').replace(/\t/g, '').trim());
	});

	// Get data rows
	$('table tr:not(:nth-child(1))').each((_, tr) => {
		const row = {};

		$(tr)
			.find('td')
			.each((i, td) => {
				const text = $(td).text().replace(/\n/g, '').replace(/\t/g, '').trim();
				row[headers[i]] = text;
			});

		rows.push(row);
	});
	console.log('rows', rows);
	return Response.json(rows);
}
