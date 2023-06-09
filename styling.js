import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import fs from 'fs';

const apiUrl = 'https://api.covalenthq.com/v1/eth-mainnet/address/demo.eth/balances_nft/?key=ckey_df06b26ac0f6496cbe4d04455ec';

fetch(apiUrl)
  .then(response => response.json())
  .then(apiResponse => {
    const nftHoldings = apiResponse.data.items;

    const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    const document = dom.window.document;

    nftHoldings.forEach((nft) => {
      if (nft.nft_data && nft.nft_data[0] && nft.nft_data[0].external_data) {
        const contractName = nft.contract_name;
        const tokenSymbol = nft.contract_ticker_symbol;
        const tokenId = nft.nft_data[0].token_id;
        const name = nft.nft_data[0].external_data.name;
        const description = nft.nft_data[0].external_data.description;
        const imageUrl = nft.nft_data[0].external_data.image;

        // Create and display HTML elements for each NFT
        const nftElement = document.createElement('div');
        const titleElement = document.createElement('h2');
        const descriptionElement = document.createElement('p');
        const imageElement = document.createElement('img');

        titleElement.textContent = `${name} (${tokenSymbol})`;
        descriptionElement.textContent = description;
        imageElement.src = imageUrl;

        nftElement.appendChild(titleElement);
        nftElement.appendChild(descriptionElement);
        nftElement.appendChild(imageElement);

        document.body.appendChild(nftElement);
      }
    });

    fs.writeFile('index.html', dom.serialize(), function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    })
    .catch(error => console.error('Error fetching data:', error));