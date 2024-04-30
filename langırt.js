// Canvas'ımızı alıp cvs isimli değişkende tutuyoruz
const cvs = document.getElementById('langırt')
const ctx = cvs.getContext('2d')

//Dikdörtgen çizmemize yardımcı olacak fonksiyonu tanımladık
const drawRect =  (x,y,w,h,color) =>{
    ctx.fillStyle = color
    ctx.fillRect (x,y,w,h)
}
//Yuvarlak çizmemize yardımcı olacak fonksiyonu tanımladık
const drawCircleF = (x,y,r,color) =>{
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(x,y,r,0,2* Math.PI,false)
    ctx.closePath()
    ctx.fill()
}
//Çember çizmemize yardımcı olacak fonksiyonu tanımladık
const drawCircleS = (x,y,r,w,color) =>{
    ctx.strokeStyle = color
    ctx.lineWidth = w
    ctx.beginPath()
    ctx.arc(x,y,r,0,2* Math.PI)
    ctx.closePath()
    ctx.stroke()
}

//Canvas'ın üzerine yazı yazmaya yarayan fonksiyonu tanımladım

const drawText = (text,x,y,color) => {
    ctx.fillStyle = color
    ctx.font = '50px sans-serif'
    ctx.fillText(text,x,y)
}
//user1'in skorunu tutuyoruz
const user1 = {
    score:0
}


// User1'in kalecisinin değerini verdik
const user1_goalkeeper = {
    x: cvs.width *1/8 - 90,
    y: cvs.height/2 - 50,
    w:10,
    h:100,
    color: '#a71930',

}



//Defansları,Orta Sahaları ve Forvetleri ilk yarısı user1, ikinci yarısı user 2'ye ait olmak üzere atadım

const defenders = [
    { x: cvs.width * 1/8, y: cvs.height * 1/4 - 50, w: 10, h: 61, color: '#a71930' },
    { x: cvs.width * 1/8, y: cvs.height * 2/4 - 50, w: 10, h: 61, color: '#a71930' },
    { x: cvs.width * 1/8, y: cvs.height * 3/4 - 50, w: 10, h: 61, color: '#a71930' },
    { x: cvs.width * 7/8, y: cvs.height * 1/4 - 50, w: 10, h: 61, color: '#000000' },
    { x: cvs.width * 7/8, y: cvs.height * 2/4 - 50, w: 10, h: 61, color: '#000000' },
    { x: cvs.width * 7/8, y: cvs.height * 3/4 - 50, w: 10, h: 61, color: '#000000' }
];

const midfielders = [
    { x: cvs.width * 3/8, y: cvs.height * 1/5 - 50, w: 10, h: 61, color: '#a71930' },
    { x: cvs.width * 3/8, y: cvs.height * 2/5 - 50, w: 10, h: 61, color: '#a71930' },
    { x: cvs.width * 3/8, y: cvs.height * 3/5 - 50, w: 10, h: 61, color: '#a71930' },
    { x: cvs.width * 3/8, y: cvs.height * 4/5 - 50, w: 10, h: 61, color: '#a71930' },
    { x: cvs.width * 5/8, y: cvs.height * 1/5 - 50, w: 10, h: 61, color: '#000000' },
    { x: cvs.width * 5/8, y: cvs.height * 2/5 - 50, w: 10, h: 61, color: '#000000' },
    { x: cvs.width * 5/8, y: cvs.height * 3/5 - 50, w: 10, h: 61, color: '#000000' },
    { x: cvs.width * 5/8, y: cvs.height * 4/5 - 50, w: 10, h: 61, color: '#000000' }
];

const forwards = [
    { x: cvs.width * 6/8, y: cvs.height * 1/4 - 50, w: 10, h: 61, color: '#a71930' },
    { x: cvs.width * 6/8, y: cvs.height * 2/4 - 50, w: 10, h: 61, color: '#a71930' },
    { x: cvs.width * 6/8, y: cvs.height * 3/4 - 50, w: 10, h: 61, color: '#a71930' },
    { x: cvs.width * 2/8, y: cvs.height * 1/4 - 50, w: 10, h: 61, color: '#000000' },
    { x: cvs.width * 2/8, y: cvs.height * 2/4 - 50, w: 10, h: 61, color: '#000000' },
    { x: cvs.width * 2/8, y: cvs.height * 3/4 - 50, w: 10, h: 61, color: '#000000' }
];

//user2'nin skorunu tutuyoruz

const user2= {
    score:0
}

// User2'nin kalecisinin değerini verdik

const user2_goalkeeper = {
    x:cvs.width -30,
    y: cvs.height/2 - 50,
    w:10,
    h:100,
    color: '#000000',

}
//Topun özelliklerini beliriyoruz
const ball = {
    x: cvs.width/2,
    y: cvs.height/2,
    r: 9,
    color: '#a51890',
    speed: 5,
    velocityX: 3,
    velocityY:4,
    stop: true
}

// Kullanıcıların hareket ettiği yönleri izlemek için değişkenler tanımlıyoruz
let user1MovingUp = false;
let user1MovingDown = false;
let user2MovingUp = false;
let user2MovingDown = false;

// Bir tuşa basıldığında hareketi başlatan fonksiyon
const movePlayers = (event) => {

    if (event.key === 'w') {
        user1MovingUp = true;
        ball.stop = false

    } else if (event.key === 's') {
        user1MovingDown = true;
        ball.stop = false

    } else if (event.key === 'ArrowUp') {
        user2MovingUp = true;
        ball.stop = false

    } else if (event.key === 'ArrowDown') {
        user2MovingDown = true;
        ball.stop = false

    }
}

// Bir tuşa basmayı bıraktığımızda hareketi durduran fonksiyon
const stopMoving = (event) => {

    if (event.key === 'w') {
        user1MovingUp = false;
        ball.stop = false

    } else if (event.key === 's') {
        ball.stop = false

        user1MovingDown = false;
    } else if (event.key === 'ArrowUp') {
        ball.stop = false

        user2MovingUp = false;
    } else if (event.key === 'ArrowDown') {
        ball.stop = false

        user2MovingDown = false;
    }
}

// Kullanıcıların hareket ettiği yönlerdeki değişiklikleri düzenli olarak uygulayan fonksiyon
const movePlayersLoop = () => {
    // User1 yukarı hareket ediyorsa
    if (user1MovingUp && user1_goalkeeper.y > 0 && midfielders[0].y > 0) {
        user1_goalkeeper.y -= 8;
        defenders.slice(0, 3).forEach(defender => {
            defender.y -= 8;
        });
        forwards.slice(0, 3).forEach(forward => {
            forward.y -= 8;
        });
        midfielders.slice(0, 4).forEach(midfielder => {
            midfielder.y -= 8;
        });
    }
    // User1 aşağı hareket ediyorsa
    if (user1MovingDown && user1_goalkeeper.y + user1_goalkeeper.h < cvs.height && midfielders[3].y + midfielders[3].h < cvs.height) {
        user1_goalkeeper.y += 8;
        defenders.slice(0, 3).forEach(defender => {
            defender.y += 8;
        });
        forwards.slice(0, 3).forEach(forward => {
            forward.y += 8;
        });
        midfielders.slice(0, 4).forEach(midfielder => {
            midfielder.y += 8;
        });
    }
    // User2 yukarı hareket ediyorsa
    if (user2MovingUp && user2_goalkeeper.y > 0 && midfielders[4].y > 0) {
        user2_goalkeeper.y -= 8;
        defenders.slice(3).forEach(defender => {
            defender.y -= 8;
        });
        forwards.slice(3, 6).forEach(forward => {
            forward.y -= 8;
        });
        midfielders.slice(4).forEach(midfielder => {
            midfielder.y -= 8;
        });
    }
    // User2 aşağı hareket ediyorsa
    if (user2MovingDown && user2_goalkeeper.y + user2_goalkeeper.h < cvs.height && midfielders[7].y + midfielders[7].h < cvs.height) {
        user2_goalkeeper.y += 8;
        defenders.slice(3).forEach(defender => {
            defender.y += 8;
        });
        forwards.slice(3, 6).forEach(forward => {
            forward.y += 8;
        });
        midfielders.slice(4).forEach(midfielder => {
            midfielder.y += 8;
        });
    }
}

// Tuş basma ve bırakma olaylarını dinleyen event listener'lar ekliyoruz
document.addEventListener('keydown', movePlayers);
document.addEventListener('keyup', stopMoving);

// Hareketlerin düzenli olarak uygulanması için bir döngü başlatıyoruz
setInterval(movePlayersLoop, 1000 / 60);


 
const checkCollision = (object) => {
    // Nesnenin sınırlarını belirledik
    const objLeft = object.x;
    const objRight = object.x + object.w;
    const objTop = object.y;
    const objBottom = object.y + object.h;

    // Topun sınırlarını belirledik
    const ballLeft = ball.x - ball.r;
    const ballRight = ball.x + ball.r;
    const ballTop = ball.y - ball.r;
    const ballBottom = ball.y + ball.r;

    // Nesnenin orta noktasını hesaplandı
    const objMiddleY = object.y + object.h / 2;

    // Çarpışma tespiti
    if (ballRight > objLeft && ballLeft < objRight && ballBottom > objTop && ballTop < objBottom) {
        // Nesnenin orta noktasına göre topun yönlendirilmesi
        const angle = Math.atan2(ball.y - objMiddleY, ball.x - object.x);
        ball.velocityX = Math.cos(angle) * ball.speed;
        ball.velocityY = Math.sin(angle) * ball.speed;
        ball.speed += 0.01; // Topun hızının artırılması
    }
    
};

// Oyunu başlangıçtaki hale döndürmemizi sağlar
const resetGame = () => {
     // User1 kalecisi
     user1_goalkeeper.x = cvs.width * 1 / 8 - 100;
     user1_goalkeeper.y = cvs.height / 2 - 50;
 
     // User2 kalecisi
     user2_goalkeeper.x = cvs.width - 30;
     user2_goalkeeper.y = cvs.height / 2 - 50;
 
     // Defans oyuncuları
     defenders.forEach((defender, index) => {
         if (index < 3) {
             defender.x = cvs.width * 1 / 8;
         } else {
             defender.x = cvs.width * 7 / 8;
         }
         defender.y = cvs.height * (index % 3 + 1) / 4 - 50;
     });
 
     // Orta saha oyuncuları
     midfielders.forEach((midfielder, index) => {
         if (index < 4) {
             midfielder.x = cvs.width * 3 / 8;
         } else {
             midfielder.x = cvs.width * 5 / 8;
         }
         midfielder.y = cvs.height * (index % 4 + 1) / 5 - 50;
     });
 
     // Forvet oyuncuları
     forwards.forEach((forward, index) => {
         if (index < 3) {
             forward.x = cvs.width * 6 / 8;
         } else {
             forward.x = cvs.width * 2 / 8;
         }
         forward.y = cvs.height * (index % 3 + 1) / 4 - 50;
     });

    ball.x = cvs.width/2
    ball.y = cvs.height/2

    ball.stop = true;
    ball.speed = 5;
    ball.velocityX = 3;
    ball.velocityY = 4;

};


//Çaepışmaları ayarlar
const checkWallCollision = () => {
    //Kalenin sınırları belirleme
    if (ball.x - ball.r < 0 || ball.x + ball.r > cvs.width  ) {
        ball.velocityX = -ball.velocityX;
        
    }
  //Kenarlardan sekme durumu
    if (ball.y - ball.r < 0 || ball.y + ball.r > cvs.height  ) {
        ball.velocityY = -ball.velocityY;
        
    }
};

const update = () => {
    if (!ball.stop) {
        ball.x += ball.velocityX;
        ball.y += ball.velocityY;
    }

    // Her nesne için çarpışma tespiti yap
    defenders.concat(midfielders, forwards).forEach(defender => {
        checkCollision(defender);
    });
    // Kaleciler için çarpışma tespiti yap
    checkCollision(user1_goalkeeper);
    checkCollision(user2_goalkeeper);

    // Duvara çarpma kontrolünü yap
    checkWallCollision();
    // Sol üst köşeye çarptığında
    // Duvarın belirli bir bölümüne çarptığında skoru arttır
    if (ball.x < (cvs.width * 1/8) - 100 && (ball.y > cvs.height / 2 - 120 && ball.y < cvs.height / 2 + 160)) {
        user2.score++; 
        resetGame(); 
    } else if (ball.x > cvs.width -10 && (ball.y > cvs.height / 2 - 120 && ball.y < cvs.height / 2 + 160)) {
        user1.score++; 
        resetGame(); 
    }

    
};


// Sayaç değişkeni
let countdown = 120;


const countdownStart = 120;

// Sayaçı azaltan fonksiyon
const decrementCountdown = () => {
    if (!ball.stop) {
        countdown--;
    }
}

// Oyun döngüsüne sayaç azaltma fonksiyonunu ekleyelim
setInterval(decrementCountdown, 1000);

// Kaleleri Çiziyorum
const drawGoals = () => {
    // User1'in kalesi
    drawRect(0, cvs.height / 2 - 120, 5, 280, '#fff');
    
    // User2'in kalesi
    drawRect(cvs.width - 5 , cvs.height / 2 - 120, 5, 280, '#fff');
};


// Oyunun tüm çizimlerini burada yapacağız
const render = () => {
    drawRect(cvs.width /2,10,4,cvs.height,'#ffcc00')
    //drawRect(cvs.width*1/8-100,cvs.height*3/4-50,20,100,'#fff')

    drawRect(0,0,cvs.width,cvs.height,'#008374')
    drawRect(cvs.width/2-2,0,4,cvs.height,'#fff')
    drawCircleF(cvs.width/2,cvs.height/2,9,'#fff')
    drawCircleS(cvs.width/2,cvs.height/2,60,4,'#fff')
    drawText(user1.score,cvs.width/4 + 20,100,'#fff')
    drawText(user2.score,3*cvs.width/4 + 20,100,'#fff')

    
    //Takımları oluşturuyorum
    drawRect(user1_goalkeeper.x,user1_goalkeeper.y,user1_goalkeeper.w,user1_goalkeeper.h,user1_goalkeeper.color)
    drawRect(user2_goalkeeper.x,user2_goalkeeper.y,user2_goalkeeper.w,user2_goalkeeper.h,user2_goalkeeper.color)

    defenders.forEach(defender => {
        drawRect(defender.x, defender.y, defender.w, defender.h, defender.color);
    });
    forwards.forEach(forwards => {
        drawRect(forwards.x, forwards.y, forwards.w, forwards.h, forwards.color);
    });
    midfielders.forEach(midfielders => {
        drawRect(midfielders.x, midfielders.y, midfielders.w, midfielders.h, midfielders.color);
    });
    
    
    // Sayaçı ekrana yazdırma
    drawText(countdown, cvs.width / 2, 50, '#fff');

    // Sayaç 0 olduğunda oyunu bitirme kontrolü
    if (countdown === 0) {
        if (user1.score > user2.score) {
            alert('Oyun bitti! Kazanan: User1. Yeniden başlamak için f5 e bas.');
        } else if (user2.score > user1.score) {
            alert('Oyun bitti! Kazanan: User2. Yeniden başlamak için f5 e bas.');
        } else {
            alert('Oyun berabere bitti! Yeniden başlamak için f5 e bas.');
        }
        resetGame(); // Oyunu sıfırla
        countdown = countdownStart; // Sayaçı başlangıç değerine geri döndür
    }
    
    
    drawCircleF(ball.x,ball.y,ball.r,ball.color)

    drawGoals();

}



const game = () => {
    update()
    render()
}
const selectColors = () => {
    const user1Color = prompt("Lütfen User1 için bir takım seçin: Trabzonspor, Galatasaray, Fenerbahçe, Beşiktaş, Bursaspor");
    const user2Color = prompt("Lütfen User2 için bir takım seçin: Trabzonspor, Galatasaray, Fenerbahçe, Beşiktaş, Bursaspor");

    const colorOptions = ['Trabzonspor', 'Galatasaray', 'Fenerbahçe', 'Beşiktaş', 'Bursaspor'];

    // User1 için renk kontrolü
    if (colorOptions.includes(user1Color)) {
        user1_goalkeeper.color = user1Color === 'Trabzonspor' ? '#a71930' :
                                user1Color === 'Galatasaray' ? '#ffcc00' :
                                user1Color === 'Fenerbahçe' ? '#000080' :
                                user1Color === 'Beşiktaş' ? '#000000' :
                                user1Color === 'Bursaspor' ? '#00ff00' : '';
        
        defenders.slice(0,3).forEach(defender => {
            defender.color = user1Color === 'Trabzonspor' ? '#a71930' :
                            user1Color === 'Galatasaray' ? '#ffcc00' :
                            user1Color === 'Fenerbahçe' ? '#000080' :
                            user1Color === 'Beşiktaş' ? '#000000' :
                            user1Color === 'Bursaspor' ? '#00ff00' : '';
        });

        midfielders.slice(0,4).forEach(midfielder => {
            midfielder.color = user1Color === 'Trabzonspor' ? '#a71930' :
                                user1Color === 'Galatasaray' ? '#ffcc00' :
                                user1Color === 'Fenerbahçe' ? '#000080' :
                                user1Color === 'Beşiktaş' ? '#000000' :
                                user1Color === 'Bursaspor' ? '#00ff00' : '';
        });

        forwards.slice(0,3).forEach(forward => {
            forward.color = user1Color === 'Trabzonspor' ? '#a71930' :
                            user1Color === 'Galatasaray' ? '#ffcc00' :
                            user1Color === 'Fenerbahçe' ? '#000080' :
                            user1Color === 'Beşiktaş' ? '#000000' :
                            user1Color === 'Bursaspor' ? '#00ff00' : '';
        });

    } else {
        alert("Geçersiz takım seçimi yapıldı. Lütfen belirtilen takımlardan birini seçin.");
        selectColors();
    }


    // User2 için renk kontrolü
    if (colorOptions.includes(user2Color)) {
        user2_goalkeeper.color = user2Color === 'Trabzonspor' ? '#a71930' :
                                  user2Color === 'Galatasaray' ? '#ffcc00' :
                                  user2Color === 'Fenerbahçe' ? '#000080' :
                                  user2Color === 'Beşiktaş' ? '#000000' :
                                  user2Color === 'Bursaspor' ? '#00ff00' : '';
        
        defenders.slice(3).forEach(defender => {
            defender.color = user2Color === 'Trabzonspor' ? '#a71930' :
                                    user2Color === 'Galatasaray' ? '#ffcc00' :
                                    user2Color === 'Fenerbahçe' ? '#000080' :
                                    user2Color === 'Beşiktaş' ? '#000000' :
                                    user2Color === 'Bursaspor' ? '#00ff00' : '';
        });

        midfielders.slice(4).forEach(midfielder => {
            midfielder.color = user2Color === 'Trabzonspor' ? '#a71930' :
                                    user2Color === 'Galatasaray' ? '#ffcc00' :
                                    user2Color === 'Fenerbahçe' ? '#000080' :
                                    user2Color === 'Beşiktaş' ? '#000000' :
                                    user2Color === 'Bursaspor' ? '#00ff00' : '';
        });

        forwards.slice(3).forEach(forward => {
            forward.color = user2Color === 'Trabzonspor' ? '#a71930' :
                                    user2Color === 'Galatasaray' ? '#ffcc00' :
                                    user2Color === 'Fenerbahçe' ? '#000080' :
                                    user2Color === 'Beşiktaş' ? '#000000' :
                                    user2Color === 'Bursaspor' ? '#00ff00' : '';
        });

    } else {
        alert("Geçersiz renk seçimi yapıldı. Lütfen belirtilen renklerden birini seçin.");
        selectColors();
    }

    if (user1Color ===user2Color){
        alert("2 kullanıcı aynı takımı seçemez. Lütfen farklı seçimler yapınız:");
        selectColors();
    }

   

};


// Renk seçimini başlat
selectColors();



const fps = 61
setInterval(game , 1000/fps)