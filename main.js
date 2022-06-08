let canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

let pI = Math.PI / 180;

var ctx = canvas.getContext('2d');
let resize_var = false;
let change_mood_var;


(window.onresize = () => {
    canvas.width = innerWidth, canvas.height = innerHeight;
    if (window.innerWidth < 700) {
        canvas.style.display = 'none';
        document.getElementById('header-start').style.display = 'none';
        document.getElementById('sorry').style.display = 'flex';
        resize_var = true;
    } else {

        if (change_mood_var == undefined) {
            document.getElementById('header-start').style.display = 'flex';
            document.getElementById('sorry').style.display = 'none';
            canvas.style.display = 'block';
            console.log('sdas')
        }
        if (document.getElementById('header-start').style.display == 'none' && resize_var == true) {
            document.getElementById('sorry').style.display = 'none';
            canvas.style.display = 'block';
            // document.getElementById('header-start').style.display = 'flex';
            resize_var = false;
        }
    }
})();

background_start()

function background_start() {
    let random = Math.floor(Math.random() * 7) + 1;
    document.getElementById('header-start').style.backgroundImage = `url(img/${random}.png)`;
}

function viewTopScore() {
    if (change_mood_var == 'player') {
        if (localStorage.getItem('topScore') == null) {
            localStorage.setItem('topScore', 0);
        }
        ctx.beginPath()
        ctx.font = "30px Comic Sans MS";
        ctx.fillStyle = "gray";
        ctx.textAlign = "center";
        ctx.fillText("Top Score : " + localStorage.getItem('topScore'), canvas.width - 200, 80);
    }
}


function change_mood(x) {
    switch (x) {
        case 'player':
            change_mood_var = 'player';
            viewTopScore()
            break;

        case 'multyplay':
            change_mood_var = 'multyplay';
            break;
    }

    document.getElementById('header-start').style.display = 'none';

    let time_snake1;
    let time_snake2;

    let x_snake1 = [],
        y_snake1 = [],
        size_snake1 = 25;
    let dir_snake1 = 'right';
    let dirq_snake1 = 'right';
    let size_snake1_num = 3;


    let x_snake2 = [],
        y_snake2 = [],
        size_snake2 = 25;
    let dir_snake2 = 'left';
    let dirq_snake2 = 'left';
    let size_snake2_num = 3;

    document.onkeydown = function(event) {
        var key = event.code;
        console.log(key)
        if (key == 'KeyA') {
            if (dirq_snake1 !== 'right') {
                dir_snake1 = 'left';
            }
        } else if (key == 'KeyD') {
            if (dirq_snake1 !== 'left') {
                dir_snake1 = 'right';
            }
        } else if (key == 'KeyW') {
            if (dirq_snake1 !== 'down') {
                dir_snake1 = 'top';
            }
        } else if (key == 'KeyS') {
            if (dirq_snake1 !== 'top') {
                dir_snake1 = 'down';
            }
        }

        if (change_mood_var == 'multyplay') {
            var key = event.key;
            if (key == 'ArrowLeft') {
                if (dirq_snake2 !== 'right') {
                    dir_snake2 = 'left';
                }
            } else if (key == 'ArrowRight') {
                if (dirq_snake2 !== 'left') {
                    dir_snake2 = 'right';
                }
            } else if (key == 'ArrowUp') {
                if (dirq_snake2 !== 'down') {
                    dir_snake2 = 'top';
                }
            } else if (key == 'ArrowDown') {
                if (dirq_snake2 !== 'top') {
                    dir_snake2 = 'down';
                }
            }
        }
        if (stop == true) {
            if (key == 'Enter') {
                restart_fun()
                if (winner_if == true) {
                    all_score_snake1 = 0;
                    all_score_snake2 = 0;
                    score()
                    winner_if = false;
                }
            }
        }
    }

    // document.onkeyup = function (event) {
    //     k = true;
    // }

    let count_snake1 = -1;
    x_snake1[0] = 50;
    y_snake1[0] = 150;
    let array_x_snake1 = [];
    let array_y_snake1 = [];
    // setTimeout(() => {
    //     clearInterval(time_snake1)
    // }, 1000);
    time_snake1 = setInterval(snake_1, 80)
    snake_1()

    function snake_1() {
        array_x_snake1[count_snake1] = x_snake1[0];
        array_y_snake1[count_snake1] = y_snake1[0];
        ctx.clearRect(array_x_snake1[count_snake1 - size_snake1_num], array_y_snake1[count_snake1 - size_snake1_num], size_snake1, size_snake1);
        count_snake1 = count_snake1 + 1;
        ctx.beginPath()
        ctx.fillStyle = '#0078ff';
        ctx.rect(x_snake1[0], y_snake1[0], size_snake1, size_snake1);
        ctx.fill();
        if (dir_snake1 == 'left') {
            x_snake1[0] -= size_snake1;
            dirq_snake1 = 'left';
        }

        if (dir_snake1 == 'down') {
            y_snake1[0] += size_snake1;
            dirq_snake1 = 'down';
        }

        if (dir_snake1 == 'top') {
            y_snake1[0] -= size_snake1;
            dirq_snake1 = 'top';
        }

        if (dir_snake1 == 'right') {
            x_snake1[0] += size_snake1;
            dirq_snake1 = 'right';
        }

    }

    // document.onkeyup = function (event) {
    //     k = true;
    // }

    let count_snake2 = -1;
    x_snake2[0] = (Math.floor((canvas.width / 25)) - 2) * 25;
    y_snake2[0] = 150;
    let array_x_snake2 = [];
    let array_y_snake2 = [];
    // setTimeout(() => {
    //     clearInterval(time_snake2)
    // }, 3200);

    if (change_mood_var == 'multyplay') {
        time_snake2 = setInterval(snake_2, 80)
        snake_2()

        function snake_2() {
            ctx.clearRect(array_x_snake2[count_snake2 - size_snake2_num], array_y_snake2[count_snake2 - size_snake2_num], size_snake2, size_snake2);
            count_snake2 = count_snake2 + 1;

            ctx.beginPath()
            ctx.fillStyle = '#5a001d';
            ctx.rect(x_snake2[0], y_snake2[0], size_snake2, size_snake2);
            ctx.fill();
            array_x_snake2[count_snake2] = x_snake2[0];
            array_y_snake2[count_snake2] = y_snake2[0];

            if (dir_snake2 == 'left') {
                x_snake2[0] -= size_snake2;
                dirq_snake2 = 'left';
            }

            if (dir_snake2 == 'down') {
                y_snake2[0] += size_snake2;
                dirq_snake2 = 'down';
            }

            if (dir_snake2 == 'top') {
                y_snake2[0] -= size_snake2;
                dirq_snake2 = 'top';
            }

            if (dir_snake2 == 'right') {
                x_snake2[0] += size_snake2;
                dirq_snake2 = 'right';
            }
        }
    }

    lines()

    function lines() {
        // #2d353e
        let color_lines = '#2d353e';
        for (let i = size_snake2; i < canvas.height + size_snake2; i = i + size_snake2) {
            ctx.lineWidth = 1;
            ctx.strokeStyle = color_lines;
            ctx.moveTo(0, i)
            ctx.lineTo(canvas.width, i)
            ctx.stroke();
        }
        // 
        for (let i = size_snake2; i < canvas.width; i = i + size_snake2) {
            ctx.lineWidth = 1;
            ctx.strokeStyle = color_lines;
            ctx.moveTo(i, 0)
            ctx.lineTo(i, canvas.height)
            ctx.stroke();
        }
    }



    let score_snake1 = size_snake2_num - 3;
    let score_snake2 = size_snake2_num - 3;

    let all_score_snake1 = 0;
    let all_score_snake2 = 0;
    score()

    function score() {
        console.log(change_mood_var)
        if (score_snake1 == 10 && change_mood_var !== 'player') {
            all_score_snake1 += 1;
            score_snake1 = 0;
        }

        ctx.clearRect(190, 30, 100, 80);
        ctx.clearRect(155, 10, 40, 50);

        ctx.beginPath()
        ctx.font = "80px sans-serif";
        ctx.fillStyle = "white";
        ctx.textAlign = "left";
        ctx.fillText(score_snake1, 200, 100);

        if (change_mood_var == 'multyplay') {
            ctx.beginPath()
            ctx.font = "30px sans-serif";
            ctx.fillStyle = "white";
            ctx.textAlign = "left";
            ctx.fillText(all_score_snake1, 160, 50);
        }

        if (change_mood_var == 'multyplay') {
            if (score_snake2 == 10) {
                all_score_snake2 += 1;
                score_snake2 = 0;
            }
            ctx.clearRect(canvas.width - 220, 30, 100, 80);
            ctx.clearRect(canvas.width - 130, 10, 40, 50);

            ctx.beginPath()
            ctx.font = "80px sans-serif";
            ctx.fillStyle = "white";
            ctx.textAlign = "left";
            ctx.fillText(score_snake2, canvas.width - 220, 100);

            ctx.beginPath()
            ctx.font = "30px sans-serif";
            ctx.fillStyle = "white";
            ctx.textAlign = "left";
            ctx.fillText(all_score_snake2, canvas.width - 130, 50);

        }

    }

    let posx_text = canvas.width / 2;
    let posy_text = canvas.height / 2 + 100;
    let color_text = '#3a171b';
    let w_text = 300;
    let h_text = 50;
    let fontSize = 90;

    function text_lose_win(x) {
        posx_text = canvas.width / 2;
        posy_text = canvas.height / 2 + 100;
        color_text = '#3a171b';
        w_text = 300;
        h_text = 50;
        // ctx.beginPath()
        // ctx.fillStyle = "#340507";
        // ctx.rect(0,0 ,canvas.width,canvas.height);
        // ctx.fill()
        ctx.beginPath()
        ctx.font = fontSize + "px Comic Sans MS";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText("snake " + x + " is lose", canvas.width / 2, canvas.height / 2);

        ctx.beginPath()
        ctx.fillStyle = color_text;
        ctx.rect(posx_text - (w_text / 2), posy_text, w_text, h_text)
        ctx.fill()

        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.font = "40px Comic Sans MS";
        ctx.fillText("restart", posx_text, canvas.height / 2 + 135);
        console.log(posx_text + '   asdsads')
    }

    function test_text() {
        setTimeout(() => {
            if (win_lose_num_snake1 == 'yes' && win_lose_num_snake2 == 'no') {
                if (change_mood_var == 'player') {
                    text_lose_win(1)
                } else {
                    if (change_mood_var == 'multyplay' && all_score_snake2 !== 10) {
                        text_lose_win(1)
                    }

                }
            }


            if (change_mood_var == 'player') {
                if (score_snake1 > localStorage.getItem('topScore')) {
                    localStorage.setItem("topScore", score_snake1);
                }
            }

            if (change_mood_var == 'multyplay') {
                if (win_lose_num_snake2 == 'yes' && win_lose_num_snake1 == 'no') {
                    if (change_mood_var == 'multyplay' && all_score_snake1 !== 10) {
                        text_lose_win(2)
                    }
                }
                if (win_lose_num_snake1 == 'yes' && win_lose_num_snake2 == 'yes') {
                    text_lose_win(1 + ' & ' + 2)
                }
            }
        }, 50);
    }


    let x_apple;
    let y_apple;
    let color_apple;
    let check_new_apple = true;
    new_apple()

    function new_apple() {
        let limet = 0;

        x_apple = Math.floor(Math.random() * (canvas.width / 25));
        y_apple = Math.floor(Math.random() * (canvas.height / 25));
        color_apple = `hsl(${~~(Math.random() * 360)},100%,50%)`;
        x_apple = x_apple * 25;
        y_apple = y_apple * 25;
        console.log(x_apple)
        console.log(y_apple)

        for (let i = size_snake1_num; i > 0; i--) {
            if (x_apple > array_x_snake1[count_snake1 - i] - size_snake1 && x_apple < array_x_snake1[count_snake1 - i] + size_snake1 && y_apple > array_y_snake1[count_snake1 - i] - size_snake1 && y_apple < array_y_snake1[count_snake1 - i] + size_snake1) {
                // ctx.clearRect(x_apple, y_apple, size_snake1, size_snake2);
                check_new_apple = false;
                x_apple = Math.floor(Math.random() * (canvas.width / 25));
                y_apple = Math.floor(Math.random() * (canvas.height / 25));
                new_apple()
            } else {
                limet = limet + 1;
            }
        }

        if (limet >= size_snake1_num) {
            check_new_apple = true;
        }

        // ctx.clearRect(x_apple, y_apple, size_snake1 + 20, size_snake2 + 20);

        if (check_new_apple == true) {
            for (let i = 0; i < 3; i++) {
                ctx.save();
                ctx.beginPath()
                ctx.fillStyle = color_apple;
                ctx.shadowColor = color_apple;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.shadowBlur = 40;
                ctx.rect(x_apple, y_apple, size_snake1, size_snake1);
                ctx.fill()
                ctx.restore();
            }
            if (change_mood_var == 'player') {
                if (score_snake1 >= localStorage.getItem('topScore')) {
                    ctx.clearRect(canvas.width - 300, 40, 220, 50);
                    localStorage.setItem("topScore", score_snake1);
                    viewTopScore();
                }
            }
            check_new_apple = false;
        }
    }

    let winner_if = false;

    function winner(x) {
        posx_text = canvas.width / 2;
        posy_text = canvas.height / 2 + 100;
        color_text = '#3a171b';
        w_text = 300;
        h_text = 50;
        if (change_mood_var == 'multyplay') {
            winner_if = true;
            stop = true;
            clearInterval(time_snake1)
            clearInterval(time_snake2)
            clearInterval(time_upp)
            score()

            ctx.beginPath()
            ctx.font = fontSize + "px Comic Sans MS";
            ctx.fillStyle = "green";
            ctx.textAlign = "center";
            ctx.fillText("snake " + x + " is winner", canvas.width / 2, canvas.height / 2);

            ctx.beginPath()
            ctx.fillStyle = color_text;
            ctx.rect(posx_text - (w_text / 2), posy_text, w_text, h_text)
            ctx.fill()


            ctx.fillStyle = "red";
            ctx.textAlign = "center";
            ctx.font = "40px Comic Sans MS";
            ctx.fillText("restart", canvas.width / 2, canvas.height / 2 + 135);
        }
    }

    let win_lose_num_snake1 = 'no';
    let win_lose_num_snake2 = 'no';
    let stop = false;
    let time_upp;
    time_upp = setInterval(uppdate, 80)

    function uppdate() {
        // new_apple()

        if (change_mood_var == 'player') {
            for (let i = size_snake1_num; i > 0; i--) {
                if (x_snake1[0] > array_x_snake1[count_snake1 - i] - size_snake1 && x_snake1[0] < array_x_snake1[count_snake1 - i] + size_snake1 && y_snake1[0] > array_y_snake1[count_snake1 - i] - size_snake1 && y_snake1[0] < array_y_snake1[count_snake1 - i] + size_snake1) {
                    stop = true;
                    clearInterval(time_snake1)
                    clearInterval(time_snake2)
                    win_lose_num_snake1 = 'yes';
                    test_text()
                }
            }
        }

        // for (let i = size_snake1_num; i > 0; i--) {
        //     if (x_apple > array_x_snake1[count_snake1 - i] - size_snake1 && x_apple < array_x_snake1[count_snake1 - i] + size_snake1 && y_apple > array_y_snake1[count_snake1 - i] - size_snake1 && y_apple < array_y_snake1[count_snake1 - i] + size_snake1) {
        //         ctx.clearRect(x_apple, y_apple, size_snake1, size_snake2);
        //     }
        // }

        //     if (x_snake2[0] > array_x_snake1[count_snake1 - i] - size_snake1 && x_snake2[0] < array_x_snake1[count_snake1 - i] + size_snake1 && y_snake2[0] > array_y_snake1[count_snake1 - i] - size_snake1 && y_snake2[0] < array_y_snake1[count_snake1 - i] + size_snake1) {
        //         stop = true;
        //         clearInterval(time_snake1)
        //         clearInterval(time_snake2)
        //         win_lose_num_snake2 = 'yes';
        //         test_text()
        //     }
        // }

        // for (let i = size_snake2_num; i > 0; i--) {
        //     if (x_snake2[0] > array_x_snake2[count_snake2 - i] - size_snake2 && x_snake2[0] < array_x_snake2[count_snake2 - i] + size_snake2 && y_snake2[0] > array_y_snake2[count_snake2 - i] - size_snake2 && y_snake2[0] < array_y_snake2[count_snake2 - i] + size_snake2) {
        //         stop = true;
        //         clearInterval(time_snake1)
        //         clearInterval(time_snake2)
        //         win_lose_num_snake2 = 'yes';
        //         test_text()
        //     }

        //     if (x_snake1[0] > array_x_snake2[count_snake2 - i] - size_snake2 && x_snake1[0] < array_x_snake2[count_snake2 - i] + size_snake2 && y_snake1[0] > array_y_snake2[count_snake2 - i] - size_snake2 && y_snake1[0] < array_y_snake2[count_snake2 - i] + size_snake2) {
        //         stop = true;
        //         clearInterval(time_snake1)
        //         clearInterval(time_snake2)
        //         win_lose_num_snake1 = 'yes';
        //         test_text()
        //     }
        // }

        if (x_snake1[0] < 0 || x_snake1[0] > canvas.width || y_snake1[0] < 0 || y_snake1[0] > canvas.height) {
            stop = true;
            clearInterval(time_snake1)
            clearInterval(time_snake2)
            clearInterval(time_upp)
            win_lose_num_snake1 = 'yes';
            test_text()
            all_score_snake2 += 1;
            score()
        }

        if (x_snake2[0] < 0 || x_snake2[0] > canvas.width || y_snake2[0] < 0 || y_snake2[0] > canvas.height) {
            stop = true;
            clearInterval(time_snake1)
            clearInterval(time_snake2)
            clearInterval(time_upp)
            test_text()
            win_lose_num_snake2 = 'yes';
            all_score_snake1 += 1;
            score()
        }


        if (x_snake1[0] > x_apple - size_snake1 && x_snake1[0] < x_apple + size_snake1 && y_snake1[0] > y_apple - size_snake1 && y_snake1[0] < y_apple + size_snake1) {
            viewTopScore()
            size_snake1_num = size_snake1_num + 1;
            score_snake1 += 1;
            score()
            new_apple()
            console.log(x_snake1[1])
        }

        if (x_snake2[0] > x_apple - size_snake2 && x_snake2[0] < x_apple + size_snake2 && y_snake2[0] > y_apple - size_snake1 && y_snake2[0] < y_apple + size_snake2) {
            size_snake2_num = size_snake2_num + 1;
            score_snake2 += 1;
            score()
            new_apple()
        }

        if (all_score_snake1 == 10) {
            winner(1)
        }
        if (all_score_snake2 == 10) {
            winner(2)
        }
    }



    function restart_fun() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        x_snake1[0] = 50;
        y_snake1[0] = 150;
        x_snake2[0] = (Math.floor((canvas.width / 25)) - 2) * 25;
        y_snake2[0] = 150;
        dir_snake1 = 'right';
        dir_snake2 = 'left';
        time_snake1 = setInterval(snake_1, 80)
        time_snake2 = setInterval(snake_2, 80)
        time_upp = setInterval(uppdate, 80)
        win_lose_num_snake1 = 'no';
        win_lose_num_snake2 = 'no';
        score_snake1 = 0;
        score_snake2 = 0;
        size_snake1_num = 3;
        size_snake2_num = 3;
        lines()
        score()
        new_apple()
        viewTopScore()
        stop = false;
    }

    canvas.onmousedown = function(event) {

        let = mouseX = event.offsetX;
        let = mouseY = event.offsetY;

        if (winner_if == true) {
            if (mouseX > posx_text - (w_text / 2) && mouseX < posx_text - (w_text / 2) + w_text && mouseY > posy_text && mouseY < posy_text + h_text) {
                all_score_snake1 = 0;
                all_score_snake2 = 0;
                score()
            }
        }

        if (stop == true) {
            if (mouseX > posx_text - (w_text / 2) && mouseX < posx_text - (w_text / 2) + w_text && mouseY > posy_text && mouseY < posy_text + h_text) {
                restart_fun()
            }

        }
    }


    canvas.onmousemove = function(event) {
        mouseX = event.offsetX;
        mouseY = event.offsetY;
        // x_snake1[0] = mouseX;
        // y_snake1[0] = mouseY;
        if (mouseX > posx_text && mouseX < posx_text + w_text && mouseY > posy_text && mouseY < posy_text + h_text) {
            color_text = '#5c161e';
        } else {
            color_text = '#3a171b';
        }
    }

    window.addEventListener('resize', resize, false);
    resize()



    function resize() {
        canvas.width = innerWidth, canvas.height = innerHeight;
        console.log('ssd')

        if (innerWidth < 700) {
            clearInterval(time_snake1)
            clearInterval(time_snake2)
            clearInterval(time_upp)
        } else {
            clearInterval(time_snake1)
            clearInterval(time_snake2)
            clearInterval(time_upp)
            restart_fun();
        }
    }
}
