<script>
  let imageUrl = '';
  let userPrompt = '';

  async function generateImage() {
    try {
      const response = await fetch('/api/replicate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userPrompt }), // Send the prompt as part of the request body
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      imageUrl = data.url; // Assuming your server responds with an object that has a "url" key
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }
  }
</script>

<div class="max-w-2xl mx-auto mt-12">
  <form class="flex flex-col gap-2">
    <input bind:value={userPrompt} placeholder="Enter a prompt" class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
    <button on:click={generateImage} class="w-fit ml-auto rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Generate Image</button>
  </form>

  {#if imageUrl}
    <div class="mt-12">
      <img src={imageUrl} alt={userPrompt}>
    </div>
  {/if}
</div>
