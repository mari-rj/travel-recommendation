// 🔍アイコンをクリックしたときに検索入力欄にフォーカスを当てる
function focusSearch() {
    document.getElementById('search-input').focus();
}

// Clearボタンをクリックしたときに検索入力欄をリセット
function clearSearch() {
    document.getElementById('search-input').value = "";
    document.getElementById('search-results').innerHTML = ""; // 検索結果をクリア
    resultsContainer.style.display = "none";
    recommendationsTitle.style.display = "none";

}

// ページ切り替え関数
function showPage(pageId) {
    // すべてのページを非表示にする
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => page.style.display = 'none');
    
    // 指定したページのみ表示
    const selectedPage = document.getElementById(pageId + '-page');
    if (selectedPage) {
        selectedPage.style.display = 'block';
    }
}

// 初期ページを表示（例えばHome）
showPage('home');

const resultsContainer = document.getElementById('search-results');

const recommendationsTitle = document.querySelector('.recommendations-title');

// 検索ボタンの処理
const searchBtn = document.querySelector('.search-btn');
searchBtn.addEventListener('click', function () {
    const query = document.getElementById('search-input').value.trim().toLowerCase();
    
    resultsContainer.innerHTML = ""; // 検索結果をリセット
    

    if (query === "") {
        resultsContainer.innerHTML = "<p>Please enter a destination or keyword.</p>";
        return;
    }

    recommendationsTitle.style.display = "block";

    // Fetch APIを使ってJSONデータを取得
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            const countries = data.countries;
            const temples = data.temples;
            const beaches = data.beaches;


            // 結果を格納する配列
            let filteredResults = [];

            // 国のデータをフィルタリング
            countries.forEach(country => {  // countries 配列内の各国のデータを処理
                country.cities.forEach(city => {  // 各国の cities 配列内の各都市を処理
                    // 検索クエリ（query）が都市名または説明文に含まれているかをチェック
                    if (city.name.toLowerCase().includes(query) || city.description.toLowerCase().includes(query)) {
                        // 条件に一致する都市の情報を filteredResults 配列に追加
                        filteredResults.push({
                            name: city.name,          // 都市の名前
                            description: city.description, // 都市の説明
                            imageUrl: city.imageUrl    // 都市の画像URL
                        });
                    }
                });
            });

            // 寺院のデータをフィルタリング
            temples.forEach(temple => {  // temples 配列内の各寺院データを処理
                // 検索クエリ（query）が寺院名または説明文に含まれているかをチェック
                if (temple.name.toLowerCase().includes(query) || temple.description.toLowerCase().includes(query)) {
                    // 条件に一致する寺院の情報を filteredResults 配列に追加
                    filteredResults.push({
                        name: temple.name,          // 寺院の名前
                        description: temple.description, // 寺院の説明
                        imageUrl: temple.imageUrl    // 寺院の画像URL
                    });
                }
            });


            console.log("beaches:",beaches)

            console.log("query:",query)



            // ビーチのデータをフィルタリング
            beaches.forEach(beach => {
                // 検索クエリ（query）がビーチ名または説明に含まれているかをチェック
                if (beach.name.toLowerCase().includes(query) || beach.description.toLowerCase().includes(query)) {
                    // 該当するビーチの情報を filteredResults 配列に追加
                    filteredResults.push({
                        name: beach.name,          // ビーチの名前
                        description: beach.description, // ビーチの説明
                        imageUrl: beach.imageUrl    // ビーチの画像URL
                    });
                }
                // ループが実行されていることを確認するためのデバッグ出力
                console.log("aaa");
            });







            console.log("filteredResults:",filteredResults)

            // 検索結果を表示
            if (filteredResults.length === 0) {
                resultsContainer.innerHTML = "<p>No results found.</p>";
            } else {


                
                filteredResults.forEach(dest => {
                    // result-item コンテナを作成
                    const resultItem = document.createElement('div');
                    resultItem.classList.add('result-item');
                    
                    // 画像を作成
                    const image = document.createElement('img');
                    image.src = dest.imageUrl;
                    image.alt = dest.name;
                    image.classList.add('result-image');
                    
                    // 名前を作成
                    const name = document.createElement('p');
                    name.textContent = dest.name;
                
                    // 説明文を作成
                    const description = document.createElement('p');
                    description.textContent = dest.description;
                
                    // 結果アイテムに画像、名前、説明を追加
                    resultItem.appendChild(image);
                    resultItem.appendChild(name);
                    resultItem.appendChild(description);
                    
                    // コンテナに追加
                    console.log(resultItem);  // ここで中身を確認
                    resultsContainer.appendChild(resultItem);
                });
                
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            resultsContainer.innerHTML = "<p>Error loading data.</p>";
        });

        resultsContainer.style.display = "block"; // 検索結果を表示(CSS適用)


});


const options = { timeZone: 'Asia/Tokyo', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
const japanTime = new Date().toLocaleTimeString('ja-JP', options);
console.log("現在の日本時間:", japanTime);

