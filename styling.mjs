import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import dotenv from 'dotenv'
dotenv.config()

const walletAddress = '0x063Df4d2daE21A38308c4358666aca6c93eCB961';
const apiUrl = `https://api.covalenthq.com/v1/eth-mainnet/address/${walletAddress}/balances_nft/?key=${process.env.COVALENT_API_KEY}`;

fetch(apiUrl)
  .then(response => response.json())
  .then(apiResponse => {
    const nftHoldings = apiResponse.data.items;

    const dom = new JSDOM('<!DOCTYPE html><html><head><link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet"><style></style></head><body><div class="title-section"></div><div class="nft-grid"></div></body></html>');
    const document = dom.window.document;
    const style = document.querySelector('style');
    const titleSection = document.querySelector('.title-section');
    const grid = document.querySelector('.nft-grid');

    // Add CSS styles
    style.textContent = `
      body {
        font-family: 'Roboto', sans-serif;
      }
      .title-section {
        text-align: center;
        margin-bottom: 20px;
      }
      .nft-grid {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        padding: 10px;
      }
      .nft-card {
        border: 1px solid #ccc;
        border-radius: 8px;
        margin: 10px;
        padding: 10px;
        width: 300px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        word-wrap: break-word;
      }
      .nft-card img, .nft-card video {
        width: 100%;
        height: auto;
      }
      .nft-card h2, .nft-card .token-id {
        margin: 0;
        padding: 0 0 10px 0;
      }
    `;

    // Add title and address at the top
    const titleElement = document.createElement('h1');
    const addressElement = document.createElement('p');

    titleElement.textContent = 'NFTs';
    addressElement.textContent = `Wallet Address: ${walletAddress}`;

    titleSection.appendChild(titleElement);
    titleSection.appendChild(addressElement);

    nftHoldings.forEach((nft) => {
      if (nft.nft_data && nft.nft_data[0] && nft.nft_data[0].external_data && nft.nft_data[0].external_data.name && nft.nft_data[0].external_data.image) {
        const tokenId = nft.nft_data[0].token_id;
        const name = nft.nft_data[0].external_data.name;
        const imageUrl = nft.nft_data[0].external_data.image;

        // Create and display HTML elements for each NFT
        const nftElement = document.createElement('div');
        nftElement.className = 'nft-card';

        const titleElement = document.createElement('h2');
        const tokenIdElement = document.createElement('p');
        tokenIdElement.className = 'token-id';

        titleElement.textContent = name;
        tokenIdElement.textContent = `Token ID: ${tokenId}`;

        nftElement.appendChild(titleElement);

        // Check if the file is an mp4
        if (imageUrl.endsWith('.mp4')) {
          const videoElement = document.createElement('video');
          videoElement.src = imageUrl;
          videoElement.controls = true; // Add video controls
          nftElement.appendChild(videoElement);
        } else {
          const imageElement = document.createElement('img');
          imageElement.src = imageUrl;
          nftElement.appendChild(imageElement);
        }

        nftElement.appendChild(tokenIdElement);

        grid.appendChild(nftElement);
      }
    });

    fs.writeFile('index.html', dom.serialize(), function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
  })
  .catch(error => console.error('Error fetching data:', error));