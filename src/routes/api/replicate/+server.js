import { REPLICATE_API_KEY } from '$env/static/private';
import Replicate from 'replicate';

const replicate = new Replicate({
	auth: REPLICATE_API_KEY
});

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const requestBody = await request.json();
	const prompt = requestBody.userPrompt;
	try {
		const output = await replicate.run(
			'lucataco/ sdxl-lightning-4step:727e49a643e999d602a896c774a0658ffefea21465756a6ce24b7ea4165eba6a',
			{
				input: {
					prompt
				}
			}
		);

    const imageUrl = Array.isArray(output) ? output[0] : null;

		if (!imageUrl) {
			return new Response(JSON.stringify({ error: 'No image URL returned by Replicate' }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		// Send the image URL back to the client
		return new Response(JSON.stringify({ url: imageUrl }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error('Error during API call:', error);
		return new Response(
			JSON.stringify({ error: 'Failed to generate image', details: error }),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' }
			}
		);
	}
}
