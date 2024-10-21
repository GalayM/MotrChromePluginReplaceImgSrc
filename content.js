function replaceImageSrc(img) {
    const src = img.getAttribute('src');
    const regexCollection = /\/\/dbpic\.motr-online\.com\/dbpic\/collection\/(\d+)\.png/;
    const regexItem2 = /\/\/dbpic\.motr-online\.com\/dbpic\/item2\/(\d+)\.png/;
    const regexMonster2 = /\/\/dbpic\.motr-online\.com\/dbpic\/monster2\/(\d+)\.png/;
    const regexMaps2 = /\/\/dbpic\.motr-online\.com\/dbpic\/maps2\/([\w_]+)\.png/;

    let match = src.match(regexCollection);
    if (match) {
        const id = match[1];
        const newSrc = `https://db.irowiki.org/image/item/${id}.png`;
        img.setAttribute('src', newSrc);
        return;
    }

    match = src.match(regexItem2);
    if (match) {
        const id = match[1];
        const newSrc = `https://db.irowiki.org/image/item/${id}.png`;
        img.setAttribute('src', newSrc);
        return;
    }

    match = src.match(regexMonster2);
    if (match) {
        const id = match[1];
        const newSrc = `https://db.irowiki.org/image/monster/${id}.png`;
        img.setAttribute('src', newSrc);
        return;
    }

    match = src.match(regexMaps2);
    if (match) {
        const mapName = match[1];
        const newSrc = `https://db.irowiki.org/image/map/thumb/${mapName}.png`;
        img.setAttribute('src', newSrc);
    }
}


function processImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => replaceImageSrc(img));
}

// Initial processing of images in the DOM
processImages();

// Create a MutationObserver to handle dynamically loaded content
const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1) { // Check if the node is an element
                    if (node.tagName === 'IMG') {
                        replaceImageSrc(node);
                    } else {
                        // Check if there are any img elements within the added node
                        const imgs = node.querySelectorAll('img');
                        imgs.forEach(img => replaceImageSrc(img));
                    }
                }
            });
        }
    });
});

// Start observing the document for changes
observer.observe(document.body, { childList: true, subtree: true });
