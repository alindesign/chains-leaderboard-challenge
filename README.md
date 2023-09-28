# Growth Team Challenge

The Chains Leaderboard is a Next.js application that displays the
top 10 users with the most number of chains.
([challenge](/src/app/challenge/_partials/challenge-content.mdx))

### Requirements

- [Node.js](https://nodejs.org/en/)

## Getting Started

```shell
# Install dependencies
$ yarn install    # or npm install

# copy .env.example to .env.local (make sure you fill LAVA_SDK_PROJECT_ID with the correct value)
$ cp .env.example .env.local

# Run the development server
$ yarn dev        # or npm run dev
```

### Website

```
/             | Home page
/leaderboard  | Leaderboard page
/challenge    | Challenge page
```

### How it works

The application uses the [Lava SDK](https://github.com/lavanet/lava/tree/main/ecosystem/lava-sdk)
to fetch the data from the Lava blockchain, data which will be then decoded and displayed on the
website.

The leaderboard page will initially load the latest 20 blocks using the lava-sdk,
after which block transactions will be fetched and decoded using the lava-sdk.

The relays of each block will be then summed up and the top 10 chains will be displayed.

The latest blocks are also displayed to fill up the page content.

After latest blocks are fetched, the application will create a long-polling connection
(I found a way to use websocket, but the methods were not supported yet), to listen for new blocks.

When a new block is received, the application will fetch the block transactions and decode them, put
the new block at the top of the list, remove the last block and update the leaderboard.

### Things to mention
- The data is fetched using server actions so no keys are exposed to the client.
- The application is not production ready, it's just a proof of concept.
- The application doesn't have any tests, I focused on the functionality.
- The UI is not responsive, I focused on the functionality.
- The UI framework used is [Joy](https://mui.com/joy-ui/getting-started/) a new framework from the MUI team.
- The application has been packed using `yarn pack` command.


### Other things
The latest blocks could be fetched with data without the need of `blockhain` method, by fetching
the latest block and then fetching the last block based on the current block last height.
But the problem is that there will be a chain of 20 requests, which will take a lot of time to complete
because the fetch will be done synchronously.
```js
const blocks = [];
let lastBlock = latestBlock();

while (blocks.length < 20 && !!lastBlock.last_commit.height) {
  const block = await getBlock(lastBlock.last_commit.height);
  blocks.push(block);
  last = block;
}
```

So the Timeline of this approach will be:
```
Fetch Latest Block(400) -> Fetch Block(399) -> Fetch Block(398) -> ... -> Fetch Block(380)
Total requests: 20
Time to complete: t(block(400)) + t(block(399)) + ... + t(block(380))
```

The approach used in the application is to fetch the latest 20 blocks using the `blockchain`
method, which will return the latest 20 blocks in a single request, and then fetch each block
to get also the block data, so the requests will be done asynchronously, the timeline would look
like this:
```
fetch blockchain(20)    -> fetch block(400)
                        -> fetch block(399)
                        -> ...
                        -> fetch block(380)
Total requests: 21
Time to complete: t(blockchain) + max(
    t(block(400)),
    t(block(399)),
    ...,
    t(block(380))
)
```
