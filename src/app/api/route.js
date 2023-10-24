import axios from 'axios';
import * as cheerio from 'cheerio';
export async function GET(req) {
	const url =
		'https://sonongnghiep.angiang.gov.vn/wps/portal/Home/2018/home/tin-chi-tiet/sa-xuctienthuongmai/sa-giacattsanpham/nongsanangiang2023#gsc.tab=0';

	const { data } = await axios.get(url);
	const $ = cheerio.load(data);

	const prices = [];

	$('table tbody tr').each((index, tr) => {
		const price = $(tr).find('td:nth-child(3)').text().trim();
		prices.push(price);
	});
	return Response.json(prices);
}
