
const bookElement = document.getElementById("book");

const pageFlip = new St.PageFlip(bookElement, {
    width: 440,
    height: 590,

    size: "stretch",

    minWidth: 280,
    maxWidth: 440,

    minHeight: 380,
    maxHeight: 590,

    showCover: true,
    usePortrait: true,

    startPage: 0,

    drawShadow: true,
    flippingTime: 900,

    // Telefon ve dokunmatik ekran desteği
    mobileScrollSupport: false,
    swipeDistance: 30,
    clickEventForward: true,
    useMouseEvents: true,

    maxShadowOpacity: 0.35,
    showPageCorners: true,

    autoSize: true,
    disableFlipByClick: false
});

// Sayfaları yükle
pageFlip.loadFromHTML(
    document.querySelectorAll(".page")
);


// Sayfa göstergeleri
const pageCounter = document.getElementById("pageCounter");
const progressBar = document.getElementById("progressBar");

const totalPages = document.querySelectorAll(".page").length;


// Sayfa bilgilerini güncelle
function updatePageInfo() {

    const currentPage = pageFlip.getCurrentPageIndex() + 1;

    pageCounter.textContent = currentPage + " / " + totalPages;

    const progress = (currentPage / totalPages) * 100;

    progressBar.style.width = progress + "%";
}


// Sayfa değişiminde güncelle
pageFlip.on("flip", function () {
    updatePageInfo();
});

pageFlip.on("init", function () {
    updatePageInfo();
});


// İleri butonları
document.getElementById("nextBtn").addEventListener("click", () => {
    pageFlip.flipNext();
});

document.getElementById("mobileNext").addEventListener("click", () => {
    pageFlip.flipNext();
});


// Geri butonları
document.getElementById("prevBtn").addEventListener("click", () => {
    pageFlip.flipPrev();
});

document.getElementById("mobilePrev").addEventListener("click", () => {
    pageFlip.flipPrev();
});

// PDF İNDİRME
document.getElementById("downloadPdf").addEventListener("click", function () {

    const printArea = document.createElement("div");

    printArea.id = "pdfPrintArea";

    document.querySelectorAll(".page").forEach(page => {

        const clone = page.cloneNode(true);

        clone.style.display = "block";
        clone.style.position = "relative";
        clone.style.transform = "none";

        printArea.appendChild(clone);

    });

    document.body.appendChild(printArea);

    const images = printArea.querySelectorAll("img");

    Promise.all(
        Array.from(images).map(img => {

            if (img.complete) {
                return Promise.resolve();
            }

            return new Promise(resolve => {
                img.onload = resolve;
                img.onerror = resolve;
            });

        })
    ).then(() => {

        window.addEventListener("afterprint", function cleanup() {

            printArea.remove();

            window.removeEventListener("afterprint", cleanup);

        });

        window.print();

    });

});

// İlk sayfa bilgisi
updatePageInfo();

