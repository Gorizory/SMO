const fs = require('fs');

const la = 1/41;
const mu = 1/229;

for (let n = 6; n < 11; n++) {
    const path = `SMO_n${n}.csv`;
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }

    const k_p = [1];

    for (let i = 1; i <= n; i++) { k_p[i] = la / i / mu * k_p[i-1];
    }

    for (let m = 1; m < 21; m++) {
        for (let j = 1; j <= m; j++) { k_p[n + j] = k_p[n] * Math.pow((la / n / mu), j);
        }

        const p0 = 1 / (function () {
            let sum = 0; k_p.forEach(k => {
                sum += k;
            });
            return sum;
        }());
        const p = [];
         k_p.forEach((k, i) => {
            p[i] = p0 * k;
        });
        
        const k_op = (function () {
            let sum = 0;
            p.forEach((p_i, i) => {
                if (i <= n) {
                    sum += p_i * i;
                } else {
                    sum += p_i * n;
                }
            });
            return sum;
        }()) / n;

        const k_q = (function () {
            let sum = 0;
            p.forEach((p_i, i) => {
                if (i > n) {
                    sum += p_i * (i - n);
                }
            });
            return sum;
        }()) / m;

        fs.appendFileSync(path, `${m}; ${k_op}; ${k_q};\n`);
    }
}