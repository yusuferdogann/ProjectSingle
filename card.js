window.onload = function() {
    const loader = document.getElementById('loader');

    if (!loader) {
        console.error("Loader öğesi bulunamadı!");
        return;
    }

    loader.style.display = 'flex';

    async function fetchData() {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJMb2dpblR5cGUiOiIxIiwiQ3VzdG9tZXJJRCI6IjU1NzI0IiwiRmlyc3ROYW1lIjoiRGVtbyIsIkxhc3ROYW1lIjoiSHlwZXIiLCJFbWFpbCI6ImRlbW9AaHlwZXIuY29tIiwiQ3VzdG9tZXJUeXBlSUQiOiIzMiIsIklzUmVzZWxsZXIiOiIwIiwiSXNBUEkiOiIxIiwiUmVmZXJhbmNlSUQiOiIiLCJSZWdpc3RlckRhdGUiOiIzLzI1LzIwMjUgMTowMDo0OCBQTSIsImV4cCI6MjA1NDE3MDQwOCwiaXNzIjoiaHR0cHM6Ly9oeXBlcnRla25vbG9qaS5jb20iLCJhdWQiOiJodHRwczovL2h5cGVydGVrbm9sb2ppLmNvbSJ9.jAFIfu0uSMQdRlb3u2Re0GpC6IvqwofLKbyv6s8yB3k"; // Gerçek tokenini buraya ekle

        try {
            const response = await fetch("https://api.hyperteknoloji.com.tr/products/list", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("API Verisi:", data);

            loader.style.display = 'none'; 

            if (!data || !data.data || data.data.length === 0) {
                throw new Error("Geçerli veri alınamadı.");
            }

            const products = data.data.slice(0, 7); 

            products.forEach((product, index) => {
                const card = document.createElement('div');
                card.classList.add('card');
                
                card.innerHTML = `
                    <div class="card-img">
                        <img src="${data.data[index]?.productData?.productMainImage || 'placeholder.jpg'}" alt="${product.name}">
                    </div>
                    <ul class="social-media">
                        <li data-tooltip="Görüntüle"><i class="material-icons">visibility</i></li>
                        <li data-tooltip="Sepete Ekle"><i class="material-icons">shopping_cart</i></li>
                        <li data-tooltip="Değerlendir(37)"><i class="material-icons">star</i></li>
                    </ul>
                    <div class="card-info">
                        <p class="title">${data.data[index]?.productName || "Bilinmeyen Ürün"}</p>
                        <p class="subtitle">${data.data[index]?.marketPrice || "Fiyat Yok"} TL</p>
                    </div>
                `;

                document.querySelector('.container.main').appendChild(card);
            });

        } catch (error) {
            console.error("API isteği başarısız:", error);

            loader.innerHTML = `<p class="error-message">Veriler yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.</p>`;
        }
    }

    fetchData(); 
};
