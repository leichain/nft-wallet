# NFT Wallet Template

This is a template that uses the Covalent API to showcase your NFTs in a customizable wallet!

The final product looks something like this:
![NFT wallet example](/images/NFTs.png)

Here is a live demo: https://leichain.github.io/nft-wallet/ 

## How to Use This Template

1. Fork this repository.
2. Create a `.env` file and input your API key as follows: `COVALENT_API_KEY=abc`, where "abc" is your key. Your key will remain private as long as you have `.env` specified in your `.gitignore` file.
3. In `styling.mjs`, modify the `const walletAddress` with the wallet address you want to display NFTs for.
![Wallet address](/images/wallet-address.png)
4. Navigate to your repository settings, then go to pages. Configure GitHub pages to deploy from your main branch.
5. In your `package.json` file, modify the `"homepage"` URL to replace `leichain` with your GitHub name.
6. Now, the `index.html` file is where your HTML is going to print when you run the `styling.mjs` script. Delete the current `index.html` file.
7. Open your terminal in VSCode. Now install your packages by typing `npm install node-fetch jsdom`. You can also install GitHub pages by typing `npm install gh-pages`.
8. Now we run our script. To do so, type `node styling.mjs`. You should see a new `index.html` file appear with your HTML. 
9. To view your receipt, go back to your settings for GitHub pages and click "Visit site" where it says your site is live. Alternatively, you can paste the same `"homepage"` URL from `package.json` into your browser. That's it!
