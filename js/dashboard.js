const canvas = document.getElementById("productionChart");

if (canvas) {

    const ctx = canvas.getContext("2d");

    function resizeCanvas() {

        const rect = canvas.parentElement.getBoundingClientRect();

        canvas.width = rect.width * window.devicePixelRatio;
        canvas.height = rect.height * window.devicePixelRatio;

        canvas.style.width = rect.width + "px";
        canvas.style.height = rect.height + "px";

        ctx.scale(
            window.devicePixelRatio,
            window.devicePixelRatio
        );

        drawChart(rect.width, rect.height);
    }


    function drawChart(width, height) {

        ctx.clearRect(0, 0, width, height);

        const padding = {
            top: 20,
            right: 20,
            bottom: 35,
            left: 45
        };

        const chartWidth =
            width - padding.left - padding.right;

        const chartHeight =
            height - padding.top - padding.bottom;


        /* --------------------------------
           BACKGROUND GRID
        -------------------------------- */

        ctx.strokeStyle = "#182438";
        ctx.lineWidth = 1;

        for (let i = 0; i <= 4; i++) {

            const y =
                padding.top +
                (chartHeight / 4) * i;

            ctx.beginPath();

            ctx.moveTo(
                padding.left,
                y
            );

            ctx.lineTo(
                width - padding.right,
                y
            );

            ctx.stroke();
        }


        /* --------------------------------
           DATA
        -------------------------------- */

        const data = [
            25.2,
            25.8,
            26.1,
            26.8,
            27.5,
            28.2,
            29.1,
            30.0,
            30.8,
            31.2,
            31.4,
            31.1,
            31.5,
            32.0,
            32.4,
            32.1,
            31.8,
            31.4,
            31.7,
            32.2,
            32.5,
            32.1,
            31.8,
            31.4
        ];


        const minValue = 20;
        const maxValue = 35;


        /* --------------------------------
           AREA
        -------------------------------- */

        const points = data.map((value, index) => {

            const x =
                padding.left +
                (index / (data.length - 1)) *
                chartWidth;

            const y =
                padding.top +
                ((maxValue - value) /
                (maxValue - minValue)) *
                chartHeight;

            return { x, y };
        });


        ctx.beginPath();

        points.forEach((point, index) => {

            if (index === 0) {

                ctx.moveTo(
                    point.x,
                    point.y
                );

            } else {

                ctx.lineTo(
                    point.x,
                    point.y
                );
            }

        });

        ctx.lineTo(
            points[points.length - 1].x,
            padding.top + chartHeight
        );

        ctx.lineTo(
            points[0].x,
            padding.top + chartHeight
        );

        ctx.closePath();

        const gradient =
            ctx.createLinearGradient(
                0,
                padding.top,
                0,
                padding.top + chartHeight
            );

        gradient.addColorStop(
            0,
            "rgba(59,130,246,0.20)"
        );

        gradient.addColorStop(
            1,
            "rgba(59,130,246,0.00)"
        );

        ctx.fillStyle = gradient;

        ctx.fill();


        /* --------------------------------
           PRODUCTION LINE
        -------------------------------- */

        ctx.beginPath();

        points.forEach((point, index) => {

            if (index === 0) {

                ctx.moveTo(
                    point.x,
                    point.y
                );

            } else {

                ctx.lineTo(
                    point.x,
                    point.y
                );

            }

        });

        ctx.strokeStyle = "#3b82f6";

        ctx.lineWidth = 2.5;

        ctx.stroke();


        /* --------------------------------
           CURRENT VALUE
        -------------------------------- */

        const current =
            points[points.length - 1];

        ctx.beginPath();

        ctx.arc(
            current.x,
            current.y,
            4,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "#3b82f6";

        ctx.fill();


        /* --------------------------------
           CURRENT VALUE LABEL
        -------------------------------- */

        ctx.font =
            "11px Arial";

        ctx.fillStyle =
            "#94a3b8";

        ctx.fillText(
            "31.4 m³/day",
            current.x - 70,
            current.y - 12
        );


        /* --------------------------------
           Y AXIS
        -------------------------------- */

        const yLabels = [
            "35",
            "30",
            "25",
            "20"
        ];

        yLabels.forEach((label, index) => {

            const y =
                padding.top +
                (chartHeight / 3) *
                index;

            ctx.fillStyle =
                "#526176";

            ctx.font =
                "10px Arial";

            ctx.fillText(
                label,
                10,
                y + 3
            );

        });


        /* --------------------------------
           X AXIS
        -------------------------------- */

        const xLabels = [
            "00:00",
            "06:00",
            "12:00",
            "18:00",
            "24:00"
        ];

        xLabels.forEach((label, index) => {

            const x =
                padding.left +
                (chartWidth / 4) *
                index;

            ctx.fillStyle =
                "#526176";

            ctx.font =
                "10px Arial";

            ctx.fillText(
                label,
                x - 15,
                height - 10
            );

        });

    }


    resizeCanvas();

    window.addEventListener(
        "resize",
        resizeCanvas
    );

}