const url = '../Assets/instrumental_interaction.pdf'
    const canvas = document.querySelector('#pdfCanvas');
    const context = canvas.getContext('2d');

    let pdf = null;
    let pageNum = 1;

    //Get pdf document
    pdfjsLib.getDocument(url).promise.then(pdf_ => {
        pdf = pdf_;
        document.querySelector('#totalPageNum').textContent = pdf.numPages;
        //Render the first page
        renderPage(pageNum);
    })

    async function renderPage(num){
        let page = await pdf.getPage(num);
        let viewport = page.getViewport({scale: 0.8});
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        let renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        await page.render(renderContext).promise;
        document.querySelector('#currentPageNum').textContent = num;
    }

    //Button handlers
    document.getElementById("prevPageBtn").addEventListener("click", () => {
        if(pageNum <= 1) return;
        pageNum--;
        renderPage(pageNum);
    })

    document.getElementById("nextPageBtn").addEventListener("click", () => {
        if(pageNum >= pdf.numPages) return;
        pageNum++;
        renderPage(pageNum);
    })