// CONSTANTA untuk MODE Odontogram
var ODONTOGRAM_MODE_HAPUS = 100; // HAPUS
var ODONTOGRAM_MODE_DEFAULT = 0; // Do Nothing
var ODONTOGRAM_MODE_AMF = 1; // Hitam = TAMBALAN AMALGAM
var ODONTOGRAM_MODE_COF = 2; // Hijau Diarsir = TAMBALAN COMPOSITE
var ODONTOGRAM_MODE_FIS = 3; // UNGU = pit dan fissure sealant
var ODONTOGRAM_MODE_NVT = 4; // SEGITIGA DIBAWAH (seperti Akar) = gigi non-vital
var ODONTOGRAM_MODE_RCT = 5; // SEGITIGA DIBAWAH (seperti Akar) filled = Perawatan Saluran Akar
var ODONTOGRAM_MODE_NON = 6; // gigi tidak ada, tidak diketahui ada atau tidak ada. (non)
var ODONTOGRAM_MODE_UNE = 7; // Un-Erupted (une)
var ODONTOGRAM_MODE_PRE = 8; // Partial-Erupt (pre) 
var ODONTOGRAM_MODE_ANO = 9; // Anomali (ano), Pegshaped, micro, fusi, etc
var ODONTOGRAM_MODE_CARIES = 10; // Caries = Tambalan sementara (car)
var ODONTOGRAM_MODE_CFR = 11; // fracture (cfr) (Tanda '#' di tengah" gigi)
var ODONTOGRAM_MODE_FMC = 12; // Full metal crown pada gigi vital (fmc)
var ODONTOGRAM_MODE_POC = 13; // Porcelain crown pada gigi vital (poc)
var ODONTOGRAM_MODE_RRX = 14; // Sisa Akar (rrx)
var ODONTOGRAM_MODE_MIS = 15; // Gigi hilang (mis)
var ODONTOGRAM_MODE_IPX = 16; // Implant + Porcelain crown (ipx - poc)


// Create closure.
(function( $ ) {
    // Class Polygon
    function Polygon(vertices, options) {
        this.name = 'Polygon';
        this.vertices = vertices;
        this.options = options;
        return this;
    }
    Polygon.prototype.render = function(ctx) {
        if (this.vertices.length <= 0) return;
        ctx.fillStyle = this.options.fillStyle;
        ctx.beginPath();

        var vertices = this.vertices.concat([]);
        var fpos = vertices.shift();
        ctx.moveTo(fpos.x, fpos.y);

        var pos;
        while (vertices.length > 0) {
            pos = vertices.shift();
            if (pos) {
                ctx.lineTo(pos.x, pos.y);
            }
        }
        ctx.lineTo(fpos.x, fpos.y);
        ctx.closePath();
        ctx.fill();
    };
    // Class AMF = Tambalan Amalgam
    function AMF(vertices, options) {
        this.name = 'AMF';
        this.vertices = vertices;
        this.options = $.extend({ fillStyle: '#222' }, options);
        return this;
    }
    AMF.prototype.render = function(ctx) {
        ctx.fillStyle = this.options.fillStyle;
        ctx.beginPath();

        var vertices = this.vertices.concat([]);
        var fpos = vertices.shift();
        ctx.moveTo(fpos.x + 1, fpos.y + 1);

        var pos;
        while (vertices.length > 0) {
            pos = vertices.shift();
            if (pos) {
                ctx.lineTo(pos.x + 1, pos.y + 1);
            }
        }
        ctx.lineTo(fpos.x + 1, fpos.y + 1);
        ctx.closePath();
        ctx.fill();
    }
    // Class COF = TAMBALAN COMPOSITE
    function COF(vertices, options) {
        this.name = 'COF';
        this.vertices = vertices;
        this.options = $.extend({ fillStyle: '#29b522' }, options);
        return this;
    }
    COF.prototype.render = function(ctx) {
        ctx.fillStyle = this.options.fillStyle;
        ctx.beginPath();

        var vertices = this.vertices.concat([]);
        var fpos = vertices.shift();
        ctx.moveTo(fpos.x + 1, fpos.y + 1);

        var top_left, top_right,
            bottom_left, bottom_right;
        var xcount = [], ycount = [];

        var pos;
        var i = 0;
        while (vertices.length > 0) {
            pos = vertices.shift();
            if (pos) {
                ctx.lineTo(pos.x + 1, pos.y + 1);
            }

            if (i == 0) { // TOP LEFT
                top_left = { x: pos.x, y: pos.y };
            } else if (i == 1) { // TOP RIGHT
                top_right = { x: pos.x, y: pos.y };
            } else if (i == 2) { // BOTTOM RIGHT
                bottom_right = { x: pos.x, y: pos.y };
            } else if (i == 3) { // BOTTOM LEFT
                bottom_left = { x: pos.x, y: pos.y };
            }

            if (xcount.indexOf(pos.x) == -1) {
                xcount.push(pos.x);
            }
            if (ycount.indexOf(pos.y) == -1) {
                ycount.push(pos.y);
            }

            i++;
        }
        ctx.lineTo(fpos.x + 1, fpos.y + 1);
        ctx.closePath();
        ctx.fill();
        // console.log("COUNT", xcount.length, ycount.length);
        // TODO: Mengarsir
        // ctx.beginPath();
        // ctx.moveTo(xpos, ypos + bigBoxSize);
        // ctx.lineTo(xpos + smallBoxSize/2, ypos + bigBoxSize - smallBoxSize/2);
        // ctx.stroke();
    }
    // Class FIS = pit dan fissure sealant
    function FIS(vertices, options) {
        this.name = 'FIS';
        this.vertices = vertices;
        this.options = $.extend({ fillStyle: '#ed3bed' }, options);
        return this;
    }
    FIS.prototype.render = function(ctx) {
        ctx.fillStyle = this.options.fillStyle;
        ctx.beginPath();

        var vertices = this.vertices.concat([]);
        var fpos = vertices.shift();
        ctx.moveTo(fpos.x + 1, fpos.y + 1);

        var pos;
        while (vertices.length > 0) {
            pos = vertices.shift();
            if (pos) {
                ctx.lineTo(pos.x + 1, pos.y + 1);
            }
        }
        ctx.lineTo(fpos.x + 1, fpos.y + 1);
        ctx.closePath();
        ctx.fill();
    }
    // Class NVT = SEGITIGA DIBAWAH (seperti Akar) = gigi non-vital
    function NVT(vertices, options) {
        this.name = 'NVT';
        this.vertices = vertices;
        this.options = $.extend({ strokeStyle: '#333', height: 25 }, options);
        return this;
    }
    NVT.prototype.render = function(ctx) {
        var x1 = parseFloat(this.vertices[0].x)+1;
        var x2 = parseFloat(this.vertices[1].x)+1;
        var y1 = parseFloat(this.vertices[0].y)+1;
        var y2 = parseFloat(this.vertices[1].y)+1;
        var size = x2 - x1;
        var height = parseFloat(this.options.height);

        ctx.strokeStyle = this.options.strokeStyle;
        ctx.beginPath();
        ctx.moveTo(x1 + size/4, y2);
        ctx.lineTo(x1 + size/2, y2 + height);
        ctx.lineTo(x2 - size/4, y2);
        ctx.closePath();
        ctx.stroke();
    }
    // Class RCT = SEGITIGA DIBAWAH (seperti Akar) filled = Perawatan Saluran Akar
    function RCT(vertices, options) {
        this.name = 'RCT';
        this.vertices = vertices;
        this.options = $.extend({ strokeStyle: '#333', fillStyle: '#333', height: 25 }, options);
        return this;
    }
    RCT.prototype.render = function(ctx) {
        var x1 = parseFloat(this.vertices[0].x)+1;
        var x2 = parseFloat(this.vertices[1].x)+1;
        var y1 = parseFloat(this.vertices[0].y)+1;
        var y2 = parseFloat(this.vertices[1].y)+1;
        var size = x2 - x1;
        var height = parseFloat(this.options.height);

        ctx.strokeStyle = this.options.strokeStyle;
        ctx.fillStyle = this.options.fillStyle;
        ctx.beginPath();
        ctx.moveTo(x1 + size/4, y2);
        ctx.lineTo(x1 + size/2, y2 + height);
        ctx.lineTo(x2 - size/4, y2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
    // Class NON = gigi tidak ada, tidak diketahui ada atau tidak ada. (non)
    function NON(vertices, options) {
        this.name = 'NON';
        this.vertices = vertices;
        this.options = $.extend({ fillStyle: '#555', fontsize: 12 }, options);
        return this;
    }
    NON.prototype.render = function(ctx) {
        var x = parseFloat(this.vertices[0].x);
        var y = parseFloat(this.vertices[0].y);
        var fontsize = parseInt(this.options.fontsize);

        ctx.fillStyle = '#000';
        ctx.font = "bold " + fontsize + "px Algerian";
        ctx.textBaseline = "bottom";
        ctx.textAlign = "left";
        ctx.fillText('   NON', x, y);
    }
    // Class UNE = Un-Erupted (une)
    function UNE(vertices, options) {
        this.name = 'UNE';
        this.vertices = vertices;
        this.options = $.extend({ fillStyle: '#555', fontsize: 12 }, options);
        return this;
    }
    UNE.prototype.render = function(ctx) {
        var x = parseFloat(this.vertices[0].x);
        var y = parseFloat(this.vertices[0].y);
        var fontsize = parseInt(this.options.fontsize);

        ctx.fillStyle = '#000';
        ctx.font = "bold " + fontsize + "px Algerian";
        ctx.textBaseline = "bottom";
        ctx.textAlign = "left";
        ctx.fillText('   UNE', x, y);
    }
    // Class PRE = Partial-Erupt (pre)
    function PRE(vertices, options) {
        this.name = 'PRE';
        this.vertices = vertices;
        this.options = $.extend({ fillStyle: '#555', fontsize: 12 }, options);
        return this;
    }
    PRE.prototype.render = function(ctx) {
        var x = parseFloat(this.vertices[0].x);
        var y = parseFloat(this.vertices[0].y);
        var fontsize = parseInt(this.options.fontsize);

        ctx.fillStyle = '#000';
        ctx.font = "bold " + fontsize + "px Algerian";
        ctx.textBaseline = "bottom";
        ctx.textAlign = "left";
        ctx.fillText('   PRE', x, y);
    }
    // Class ANO = Anomali (ano), Pegshaped, micro, fusi, etc
    function ANO(vertices, options) {
        this.name = 'ANO';
        this.vertices = vertices;
        this.options = $.extend({ fillStyle: '#555', fontsize: 12 }, options);
        return this;
    }
    ANO.prototype.render = function(ctx) {
        var x = parseFloat(this.vertices[0].x);
        var y = parseFloat(this.vertices[0].y);
        var fontsize = parseInt(this.options.fontsize);

        ctx.fillStyle = '#000';
        ctx.font = "bold " + fontsize + "px Algerian";
        ctx.textBaseline = "bottom";
        ctx.textAlign = "left";
        ctx.fillText('   ANO', x, y);
    }
    // Class CARIES = Caries = Tambalan sementara (car)
    function CARIES(vertices, options) {
        this.name = 'CARIES';
        this.vertices = vertices;
        this.options = $.extend({ strokeStyle: '#333' }, options);
        return this;
    }
    CARIES.prototype.render = function(ctx) {
        ctx.strokeStyle = this.options.strokeStyle;
        ctx.lineWidth = 4;
        ctx.beginPath();

        var vertices = this.vertices.concat([]);
        var fpos = vertices.shift();
        ctx.moveTo(fpos.x, fpos.y);

        var pos;
        while (vertices.length > 0) {
            pos = vertices.shift();
            if (pos) {
                ctx.lineTo(pos.x, pos.y);
            }
        }
        ctx.lineTo(fpos.x, fpos.y);
        ctx.closePath();
        ctx.stroke();
    }
    // Class CFR = fracture (cfr) (Tanda '#' di tengah" gigi)
    function CFR(vertices, options) {
        this.name = 'CFR';
        this.vertices = vertices;
        this.options = $.extend({ fillStyle: '#555'}, options);
        return this;
    }
    CFR.prototype.render = function(ctx) {
        var x1 = parseFloat(this.vertices[0].x);
        var y1 = parseFloat(this.vertices[0].y);
        var x2 = parseFloat(this.vertices[1].x);
        var y2 = parseFloat(this.vertices[1].y);
        var boxSize = x2 - x1;
        var fontsize = parseInt(boxSize);

        var x = x1 + boxSize/2;
        var y = y1 + boxSize/2;

        ctx.fillStyle = '#000';
        ctx.font = "bold " + fontsize + "px Algerian";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText('#', x, y);
    }
    // Class FMC = Full metal crown pada gigi vital (fmc)
    function FMC(vertices, options) {
        this.name = 'FMC';
        this.vertices = vertices;
        this.options = $.extend({ strokeStyle: '#333' }, options);
        return this;
    }
    FMC.prototype.render = function(ctx) {
        var x1 = parseFloat(this.vertices[0].x) + 1;
        var y1 = parseFloat(this.vertices[0].y) + 1;
        var x2 = parseFloat(this.vertices[1].x) + 1;
        var y2 = parseFloat(this.vertices[1].y) + 1;
        var vertices = [
            { x: x1, y: y1 },
            { x: x2, y: y1 },
            { x: x2, y: y2 },
            { x: x1, y: y2}
        ];

        ctx.strokeStyle = this.options.strokeStyle;
        ctx.lineWidth = 6;
        ctx.beginPath();

        var fpos = vertices.shift();
        ctx.moveTo(fpos.x, fpos.y);

        var pos;
        while (vertices.length > 0) {
            pos = vertices.shift();
            if (pos) {
                ctx.lineTo(pos.x, pos.y);
            }
        }
        ctx.lineTo(fpos.x, fpos.y);
        ctx.closePath();
        ctx.stroke();
    }
    // Class POC = Porcelain crown pada gigi vital (poc)
    function POC(vertices, options) {
        this.name = 'POC';
        this.vertices = vertices;
        this.options = $.extend({ strokeStyle: '#333' }, options);
        return this;
    }
    POC.prototype.render = function(ctx) {
        var x1 = parseFloat(this.vertices[0].x) + 1;
        var y1 = parseFloat(this.vertices[0].y) + 1;
        var x2 = parseFloat(this.vertices[1].x) + 1;
        var y2 = parseFloat(this.vertices[1].y) + 1;
        var vertices = [
            { x: x1, y: y1 },
            { x: x2, y: y1 },
            { x: x2, y: y2 },
            { x: x1, y: y2}
        ];

        ctx.strokeStyle = this.options.strokeStyle;
        ctx.lineWidth = 6;
        ctx.beginPath();

        var fpos = vertices.shift();
        ctx.moveTo(fpos.x, fpos.y);

        var pos;
        while (vertices.length > 0) {
            pos = vertices.shift();
            if (pos) {
                ctx.lineTo(pos.x, pos.y);
            }
        }
        ctx.lineTo(fpos.x, fpos.y);
        ctx.closePath();
        ctx.stroke();

        // Draw Lines
        ctx.lineWidth = 1;
        for (var xpos = x1; xpos < x2; xpos+=((x2-x1)/15)) {
            xpos = Math.min(xpos, x2);

            ctx.beginPath();
            ctx.moveTo(xpos, y1);
            ctx.lineTo(xpos, y2);
            ctx.stroke();
        }
    }
    // Class RRX = Sisa Akar (rrx)
    function RRX(vertices, options) {
        this.name = 'RRX';
        this.vertices = vertices;
        this.options = $.extend({ strokeStyle: '#333' }, options);
        return this;
    }
    RRX.prototype.render = function(ctx) {
        var x1 = parseFloat(this.vertices[0].x) + 1;
        var y1 = parseFloat(this.vertices[0].y) + 1;
        var x2 = parseFloat(this.vertices[1].x) + 1;
        var y2 = parseFloat(this.vertices[1].y) + 1;
        var bigBoxSize = x2 - x1;
        var smallBoxSize = bigBoxSize/2;
        var lines = [
            { 
                x1: x1 + smallBoxSize/3, y1: y1 - smallBoxSize/2,
                x2: x1 + smallBoxSize, y2: y2 + smallBoxSize/2 
            },
            {
                x1: x1 + smallBoxSize, y1: y2 + smallBoxSize/2,
                x2: x1 + smallBoxSize*2, y2: y1 - smallBoxSize 
            }
        ];

        ctx.strokeStyle = this.options.strokeStyle;
        ctx.lineWidth = 4;
        var line;
        for (var i = 0; i < lines.length; i++) {
            line = lines[i];
            ctx.beginPath();
            ctx.moveTo(line.x1, line.y1);
            ctx.lineTo(line.x2, line.y2);
            ctx.stroke();
        }
    }
    // Class MIS = Gigi hilang (mis)
    function MIS(vertices, options) {
        this.name = 'MIS';
        this.vertices = vertices;
        this.options = $.extend({ strokeStyle: '#333' }, options);
        return this;
    }
    MIS.prototype.render = function(ctx) {
        var x1 = parseFloat(this.vertices[0].x) + 1;
        var y1 = parseFloat(this.vertices[0].y) + 1;
        var x2 = parseFloat(this.vertices[1].x) + 1;
        var y2 = parseFloat(this.vertices[1].y) + 1;
        var bigBoxSize = x2 - x1;
        var smallBoxSize = bigBoxSize/2;
        var lines = [
            { 
                x1: x1 + smallBoxSize*.5, y1: y1 - smallBoxSize/2,
                x2: x1 + smallBoxSize*1.5, y2: y2 + smallBoxSize/2 
            },
            {
                x1: x1 + smallBoxSize*1.5, y1: y1 - smallBoxSize/2,
                x2: x1 + smallBoxSize*.5, y2: y2 + smallBoxSize/2
            }
        ];

        ctx.strokeStyle = this.options.strokeStyle;
        ctx.lineWidth = 4;
        var line;
        for (var i = 0; i < lines.length; i++) {
            line = lines[i];
            ctx.beginPath();
            ctx.moveTo(line.x1, line.y1);
            ctx.lineTo(line.x2, line.y2);
            ctx.stroke();
        }
    }
    // Class IPX = Implant + Porcelain crown (ipx - poc)
    function IPX(vertices, options) {
        this.name = 'IPX';
        this.vertices = vertices;
        this.options = $.extend({ fillStyle: '#555', fontsize: 12 }, options);
        return this;
    }
    IPX.prototype.render = function(ctx) {
        var x = parseFloat(this.vertices[0].x);
        var y = parseFloat(this.vertices[1].y);
        var fontsize = parseInt(this.options.fontsize);

        ctx.fillStyle = '#000';
        ctx.font = "bold " + fontsize + "px Algerian";
        ctx.textBaseline = "top";
        ctx.textAlign = "left";
        ctx.fillText('   IPX', x, y);
    }
    // Class HAPUS
    function HAPUS(vertices, options) {
        this.name = 'HAPUS';
        this.vertices = vertices;
        this.options = $.extend({ fillStyle: 'rgba(200, 200, 200, 0.8)' }, options);
        return this;
    }
    HAPUS.prototype.render = function(ctx) {
        var x1 = parseFloat(this.vertices[0].x) + 1;
        var y1 = parseFloat(this.vertices[0].y) + 1;
        var x2 = parseFloat(this.vertices[1].x) + 1;
        var y2 = parseFloat(this.vertices[1].y) + 1;
        var x = x1;
        var y = y1;
        var size = x2 - x1;
        
        ctx.beginPath();
        ctx.fillStyle = this.options.fillStyle;
        ctx.rect(x, y, size, size); 
        ctx.fill();
    }

    // Class Odontogram
    function Odontogram(jqEl, settings) {
        this.jquery = jqEl;
        this.canvas = jqEl.get(0);
        this.context = jqEl.get(0).getContext('2d');
        this.settings = settings;
        this.mode = ODONTOGRAM_MODE_DEFAULT;
        this.hoverGeoms = [];
        this.geometry = {};
        this.active_geometry = null; // Selected Geometry

        this.teeth = {}; // Menyimpan Coordinate Gigi dengan key: x1:y1;x2:y2;cx:cy

        this._drawBackground();
        return this;
    }

    Odontogram.prototype.setMode = function(mode) {
        this.mode = mode;

        return this;
    };

    Odontogram.prototype._drawBackground = function() {
        var canvas = this.canvas;
        var ctx = this.context;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clears the canvas

        var width = ctx.canvas.width;
        var height = ctx.canvas.height;

        var pl = 10,
            pr = 10,
            pt = 30,
            pb = 10,
            gap_per = 10,
            gap_bag = 30;

        var bigBoxSize = (width - (pl + pt + (gap_per * 16) + gap_bag)) / 16;
        var smallBoxSize = bigBoxSize / 2;

        // Numbers
        var numbers = [
            '18', '17', '16', '15', '14', '13', '12', '11',     '21', '22', '23', '24', '25', '26', '27', '28',
                              '55', '54', '53', '52', '51',     '61', '62', '63', '64', '65',
                              '85', '84', '83', '82', '81',     '71', '72', '73', '74', '75',
            '48', '47', '46', '45', '44', '43', '42', '41',     '31', '32', '33', '34', '35', '36', '37', '38'
        ];

        var xpos, ypos;
        var sec = 0;
        var num;
        var x1, x2, y1, y2, cx, cy;
        var key;
        for (var y = 0; y < 4; y++) {
            sec = 0;
            for (var x = 0; x < 16; x++) {
                if (x % 8 == 0 && x != 0) sec++;
                // else sec = 0;

                if ((y % 3 != 0) && 
                    (x < 8 ? (x % 8) - 2 <= 0 : (x % 8) >= 5) ) continue;

                xpos = x * bigBoxSize + (pl) + x * gap_per + (sec * gap_bag);
                ypos = y * bigBoxSize + pt + (pt * y);

                // Big Box
                ctx.beginPath();
                ctx.lineWidth="2";
                ctx.strokeStyle="#555";
                ctx.rect(xpos, ypos, bigBoxSize, bigBoxSize); 
                ctx.stroke();

                // Small Box
                ctx.beginPath();
                ctx.lineWidth="2";
                ctx.strokeStyle="#555";
                ctx.rect(xpos + smallBoxSize/2, ypos + smallBoxSize/2, smallBoxSize, smallBoxSize); 
                ctx.stroke();

                // Lines
                //// Top Left
                ctx.beginPath();
                ctx.moveTo(xpos, ypos);
                ctx.lineTo(xpos + smallBoxSize/2, ypos + smallBoxSize/2);
                ctx.stroke();
                //// Top Right
                ctx.beginPath();
                ctx.moveTo(xpos + bigBoxSize, ypos);
                ctx.lineTo(xpos + bigBoxSize - smallBoxSize/2, ypos + smallBoxSize/2);
                ctx.stroke();
                //// Bottom Left
                ctx.beginPath();
                ctx.moveTo(xpos, ypos + bigBoxSize);
                ctx.lineTo(xpos + smallBoxSize/2, ypos + bigBoxSize - smallBoxSize/2);
                ctx.stroke();
                //// Bottom Right
                ctx.beginPath();
                ctx.moveTo(xpos + bigBoxSize, ypos + bigBoxSize);
                ctx.lineTo(xpos + bigBoxSize - smallBoxSize/2, ypos + bigBoxSize - smallBoxSize/2);
                ctx.stroke();

                // Numbers
                num = numbers.shift();
                ctx.font = "12px Arial";
                ctx.textBaseline = "bottom";
                ctx.textAlign = "center";
                ctx.fillText(num, xpos + bigBoxSize / 2, ypos + bigBoxSize * 1.4);

                x1 = xpos;y1 = ypos;
                x2 = xpos + bigBoxSize;y2 = ypos + bigBoxSize;
                cx = xpos + bigBoxSize/2;cy = ypos + bigBoxSize/2;
                key = x1 + ':' + y1 + ';' + x2 + ':' + y2 + ';' + cx + ':' + cy;
                this.teeth[key] = {
                    bigBoxSize: bigBoxSize,
                    smallBoxSize: smallBoxSize,
                    x1: x1,
                    y1: y1,
                    x2: x2,
                    y2: y2,
                    cx: cx,
                    cy: cy,
                    // Coords shapes (top left, top right, bottom left, bottom right)
                    top: { 
                        tl: { x: xpos, y: ypos }, 
                        tr: { x: xpos + bigBoxSize, y: ypos }, 
                        br: { x: xpos + bigBoxSize - smallBoxSize/2, y: ypos + smallBoxSize/2 },
                        bl: { x: xpos + smallBoxSize/2, y: ypos + smallBoxSize/2 }
                    }, 
                    right: {
                        tl: { x: xpos + bigBoxSize - smallBoxSize/2, y: ypos + smallBoxSize/2 },
                        tr: { x: xpos + bigBoxSize, y: ypos },
                        br: { x: xpos + bigBoxSize, y: ypos + bigBoxSize },
                        bl: { x: xpos + bigBoxSize - smallBoxSize/2, y: ypos + bigBoxSize - smallBoxSize/2 }
                    },
                    bottom: {
                        tl: { x: xpos + smallBoxSize/2, y: ypos + bigBoxSize - smallBoxSize/2 },
                        tr: { x: xpos + bigBoxSize - smallBoxSize/2, y: ypos + bigBoxSize - smallBoxSize/2 },
                        br: { x: xpos + bigBoxSize, y: ypos + bigBoxSize },
                        bl: { x: xpos, y: ypos + bigBoxSize }
                    },
                    left: {
                        tl: { x: xpos, y: ypos },
                        tr: { x: xpos + smallBoxSize/2, y: ypos + smallBoxSize/2 },
                        br: { x: xpos + smallBoxSize/2, y: ypos + bigBoxSize - smallBoxSize/2 },
                        bl: { x: xpos, y: ypos + bigBoxSize }
                    },
                    middle: {
                        tl: { x: xpos + smallBoxSize/2, y: ypos + smallBoxSize/2 },
                        tr: { x: xpos + bigBoxSize - smallBoxSize/2, y: ypos + smallBoxSize/2 },
                        br: { x: xpos + bigBoxSize - smallBoxSize/2, y: ypos + bigBoxSize - smallBoxSize/2 },
                        bl: { x: xpos + smallBoxSize/2, y: ypos + bigBoxSize - smallBoxSize/2 }
                    }
                }
            }
        }

        var me = this;
        var img = new Image();
        img.src = this.getDataURL();
        img.onload = function () {
            me.background = {
                image: img,
                x: 1,
                y: 1,
                w: img.naturalWidth,
                h: img.naturalHeight
            };

            me.redraw();
        }
    }

    Odontogram.prototype.redraw = function() {
        var canvas = this.canvas;
        var ctx = this.context;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clears the canvas

        if (this.background) { // Background
            ctx.drawImage(this.background.image, this.background.x, this.background.y, ctx.canvas.width, ctx.canvas.height);
        }

        // Draw Hover Geom
        var hoverGeoms;
        for (var i = 0; i < this.hoverGeoms.length; i++) {
            hoverGeoms = convertGeom(this.hoverGeoms[i], this.mode);
            hoverGeoms.render(ctx);
        }


        // Draw Geometry
        var geoms;
        for (var keyCoord in this.geometry) {
            geoms = this.geometry[keyCoord];
            for (var x in geoms) {
                geoms[x].render(ctx);
            }
        }

        return this;
    };

    Odontogram.prototype.setGeometry = function(geometry) {
        for (var keyCoord in geometry) {
            for (var i = 0; i < geometry[keyCoord].length; i++) {
                geometry[keyCoord][i] = convertGeomFromObject(geometry[keyCoord][i]);
            }
        }

        this.geometry = geometry;

        this.redraw();
    }

    Odontogram.prototype.getDataURL = function() {
        return this.canvas.toDataURL();
    }

    $.fn.odontogram = function (mode, arg1, arg2, arg3, arg4) {
        var instance = this.data('odontogram');
        switch (mode) {
            case 'init': // Arg1 is options
                if (this.prop('nodeName') !== "CANVAS") {
                    throw Error('Odontogram must be valid `CANVAS`.');
                }

                if (instance != null) {
                    throw Error("can't reinitialize odontogram.");
                }

                initialize(this, arg1);
                break;
            case 'setMode':
                checkOdontogram(this, mode);
                setMode(this, arg1);
                break;
            case 'redraw':
                checkOdontogram(this, mode);
                redraw(this);
                break;
            case 'getDataURL':
                checkOdontogram(this, mode);
                return instance.getDataURL();
                break;
            case 'setGeometry':
                checkOdontogram(this, mode);
                instance.setGeometry(arg1);
                break;
            // DLL
        }
        
        return this;
    }

    function initialize($this, options) {
        var settings = $.extend({}, $.fn.odontogram.defaults, options);

        var canvas = $this.get(0);

        $this.prop('height', settings.height)
            .prop('width', settings.width)
            .css('width', settings.width)
            .css('height', settings.height);

        canvas.width = parseFloat(settings.width);
        canvas.height = parseFloat(settings.height);

        var instance = new Odontogram($this, settings);

        $this.data('odontogram', instance);

        $this
            .on('mousemove', _on_mouse_move)
            .on('click', _on_mouse_click);

        return $this;
    }

    function setMode($this, mode) {
        // TODO
        // switch (mode) {
        //     default:
        //         throw Error("Odontogram invalid mode `" + mode + "`");
        // }
        var instance = $this.data('odontogram');
        instance.setMode(mode);
    }

    function redraw($this) {
        var instance = $this.data('odontogram');
        instance.redraw();
    }

    function checkOdontogram($this, mode) {
        if ($this.data('odontogram') == null || !($this.data('odontogram') instanceof Odontogram)) {
            throw Error('`' + mode + '` must be valid Odontogram object.');
        }
    }

    // HELPERS
    // Convert Geometry to Specific Mode (geometry = Polygon)
    function convertGeom(geometry, mode) {
        var newGeometry;
        switch (mode) {
            case ODONTOGRAM_MODE_AMF:
                newGeometry = new AMF(geometry.vertices);
                break;
            case ODONTOGRAM_MODE_COF:
                newGeometry = new COF(geometry.vertices);
                break;
            case ODONTOGRAM_MODE_FIS:
                newGeometry = new FIS(geometry.vertices);
                break;
            case ODONTOGRAM_MODE_NVT:
                newGeometry = new NVT(geometry.vertices);
                break;
            case ODONTOGRAM_MODE_RCT:
                newGeometry = new RCT(geometry.vertices);
                break;
            case ODONTOGRAM_MODE_NON:
                newGeometry = new NON(geometry.vertices);
                break;
            case ODONTOGRAM_MODE_UNE:
                newGeometry = new UNE(geometry.vertices);
                break;
            case ODONTOGRAM_MODE_PRE:
                newGeometry = new PRE(geometry.vertices);
                break;
            case ODONTOGRAM_MODE_ANO:
                newGeometry = new ANO(geometry.vertices);
                break;
            case ODONTOGRAM_MODE_CARIES:
                newGeometry = new CARIES(geometry.vertices);
                break;
            case ODONTOGRAM_MODE_CFR:
                newGeometry = new CFR(geometry.vertices);
                break;
            case ODONTOGRAM_MODE_FMC:
                newGeometry = new FMC(geometry.vertices);
                break;
            case ODONTOGRAM_MODE_POC:
                newGeometry = new POC(geometry.vertices);
                break;
            case ODONTOGRAM_MODE_RRX:
                newGeometry = new RRX(geometry.vertices);
                break;
            case ODONTOGRAM_MODE_MIS:
                newGeometry = new MIS(geometry.vertices);
                break;
            case ODONTOGRAM_MODE_IPX:
                newGeometry = new IPX(geometry.vertices);
                break;
            case ODONTOGRAM_MODE_HAPUS:
                newGeometry = new HAPUS(geometry.vertices);
                break;
            default:
                newGeometry = geometry;
                break;
        }

        return newGeometry;
    }

    function convertGeomFromObject(geometry) {
        var newGeom = null;
        switch (geometry.name) {
            case 'Polygon':
                newGeom = new Polygon(geometry.vertices, geometry.options);
                break;
            case 'AMF':
                newGeom = new AMF(geometry.vertices, geometry.options);
                break;
            case 'COF':
                newGeom = new COF(geometry.vertices, geometry.options);
                break;
            case 'FIS':
                newGeom = new FIS(geometry.vertices, geometry.options);
                break;
            case 'NVT':
                newGeom = new NVT(geometry.vertices, geometry.options);
                break;
            case 'RCT':
                newGeom = new RCT(geometry.vertices, geometry.options);
                break;
            case 'NON':
                newGeom = new NON(geometry.vertices, geometry.options);
                break;
            case 'UNE':
                newGeom = new UNE(geometry.vertices, geometry.options);
                break;
            case 'PRE':
                newGeom = new PRE(geometry.vertices, geometry.options);
                break;
            case 'ANO':
                newGeom = new ANO(geometry.vertices, geometry.options);
                break;
            case 'CARIES':
                newGeom = new CARIES(geometry.vertices, geometry.options);
                break;
            case 'CFR':
                newGeom = new CFR(geometry.vertices, geometry.options);
                break;
            case 'FMC':
                newGeom = new FMC(geometry.vertices, geometry.options);
                break;
            case 'POC':
                newGeom = new POC(geometry.vertices, geometry.options);
                break;
            case 'RRX':
                newGeom = new RRX(geometry.vertices, geometry.options);
                break;
            case 'MIS':
                newGeom = new MIS(geometry.vertices, geometry.options);
                break;
            case 'IPX':
                newGeom = new IPX(geometry.vertices, geometry.options);
                break;
            case 'HAPUS':
                newGeom = new HAPUS(geometry.vertices, geometry.options);
                break;
        }

        return newGeom;
    }

    //// Check Hover On Teeth (return Geom)
    function getHoverShapeOnTeeth(mouse, teeth) {
        var geoms = [];
        for (var key in teeth) {
            switch (key) {
                case 'middle':
                case 'top':
                case 'bottom':
                case 'left':
                case 'right':
                    if (isPolyIntersect(teeth[key], { mouse: mouse })) {
                        geoms.push(teeth[key]);
                    }
                    break;
            }
        }

        var polygonOpt = {
            fillStyle: 'rgba(55, 55, 55, 0.2)'
        };
        var polygons = [];
        var vertices;
        for (var i = 0; i < geoms.length; i++) {
            vertices = [];
            for (var key in geoms[i]) {
                vertices.push(geoms[i][key]);
            }
            polygons.push(new Polygon(vertices, polygonOpt));
        }

        return polygons;
    }

    function isRectIntersect(rectA, rectB) {
        return rectA.x1 < rectB.x2 && rectA.x2 > rectB.x1 &&
                rectA.y1 < rectB.y2 && rectA.y2 > rectB.y1;      
    }

    function isPolyIntersect(polyA, polyB) {
        var polyAVertices = getPolyVertices(polyA);
        var polyBVertices = getPolyVertices(polyB);

        // Sementara Menggunakan Rectangle Collision
        if (polyAVertices.length == 4 && polyBVertices.length == 1) {
            var rectA = {
                x1: polyAVertices[0].x,
                x2: polyAVertices[1].x,
                y1: polyAVertices[0].y,
                y2: polyAVertices[2].y
            };
            var rectB = {
                x1: polyBVertices[0].x,
                x2: polyBVertices[0].x,
                y1: polyBVertices[0].y,
                y2: polyBVertices[0].y
            }

            return isRectIntersect(rectA, rectB);
        }

        return true;
    }

    function getPolyVertices(poly) {
        var vertices = [];
        for (var key in poly) {
            vertices.push(poly[key]);
        }
        return vertices;
    }

    function parseKeyCoord(key) {
        var x1, x2, y1, y2, cx, cy;
        var keyChunks, temp;

        keyChunks = key.split(';');
        for (var i = 0; i < 3; i++) {
            temp = keyChunks[i].split(':');
            if (i == 0) {
                x1 = temp[0];
                y1 = temp[1];
            } else if (i == 1) {
                x2 = temp[0];
                y2 = temp[1];
            } else {
                cx = temp[0];
                cy = temp[1];
            }
        }

        return {
            x1: x1, y1: y1,
            x2: x2, y2: y2,
            cx: cx, cy: cy
        };
    }

    // Menggabungkan, jika ada bentuk yang tidak sesuai maka akan dihapus atau diganti.
    function joinShapeTeeth(geoms1, geoms2) {
        var geometry = $.extend(true, {}, geoms1);
        var geom1, geom2;
        for (var keyCoord in geoms2) {
            geom1 = geoms1[keyCoord];
            geom2 = geoms2[keyCoord];
            if (geom1 == null) {
                geometry[keyCoord] = geom2;
            } else {
                geometry[keyCoord] = _joinShapeTeeth(geom1, geom2);
            }
        }

        return geometry;
    }

    // Rules :..(
    function _joinShapeTeeth(geoms1, geoms2) {
        var geom1, geom2;
        var geometry = [];
        for (var y = 0; y < geoms2.length; y++) {
            geom2 = geoms2[y];
            geometry = [geom2];
            for (var x = 0; x < geoms1.length; x++) {
                geom1 = geoms1[x];
                switch (true) {
                    case geom2 instanceof AMF:
                        switch (true) {
                            case geom1 instanceof AMF:
                            case geom1 instanceof RCT:
                                geometry.push(geom1);
                                break;
                        }
                        break;
                    case geom2 instanceof COF:
                        switch (true) {
                            case geom1 instanceof COF:
                            case geom1 instanceof RCT:
                                geometry.push(geom1);
                                break;
                        }
                        break;
                    case geom2 instanceof FIS:
                        switch (true) {
                            case geom1 instanceof FIS:
                                geometry.push(geom1);
                                break;
                        }
                        break;
                    case geom2 instanceof NVT:
                        switch (true) {
                            case geom1 instanceof NVT:
                                geometry.push(geom1);
                                break;
                        }
                        break;
                    case geom2 instanceof RCT:
                        switch (true) {
                            case geom1 instanceof AMF:
                            case geom1 instanceof COF:
                            case geom1 instanceof POC:
                            case geom1 instanceof FMC:
                                geometry.push(geom1);
                                break;
                        }
                        break;
                        break;
                    case geom2 instanceof NON:
                        switch (true) {
                            case geom1 instanceof NON:
                                geometry.push(geom1);
                                break;
                        }
                        break;
                    case geom2 instanceof UNE:
                        switch (true) {
                            case geom1 instanceof UNE:
                                geometry.push(geom1);
                                break;
                        }
                        break;
                    case geom2 instanceof PRE:
                        switch (true) {
                            case geom1 instanceof PRE:
                                geometry.push(geom1);
                                break;
                        }
                        break;
                    case geom2 instanceof ANO:
                        switch (true) {
                            case geom1 instanceof ANO:
                                geometry.push(geom1);
                                break;
                        }
                        break;
                    case geom2 instanceof CARIES:
                        switch (true) {
                            case geom1 instanceof CARIES:
                                geometry.push(geom1);
                                break;
                        }
                        break;
                    case geom2 instanceof CFR:
                        //
                        break;
                    case geom2 instanceof FMC:
                        switch (true) {
                            case geom1 instanceof RCT:
                                geometry.push(geom1);
                                break;
                        }
                        break;
                    case geom2 instanceof POC:
                        switch (true) {
                            case geom1 instanceof POC:
                            case geom1 instanceof IPX:
                            case geom1 instanceof RCT:
                                geometry.push(geom1);
                                break;
                        }
                        break;
                    case geom2 instanceof RRX:
                        // 
                        break;
                    case geom2 instanceof MIS:
                        //
                        break;
                    case geom2 instanceof IPX:
                        switch (true) {
                            case geom1 instanceof POC:
                                geometry.push(geom1);
                                break;
                        }
                        break;
                    default:
                        console.log("DEFAULT[POLYGON]");
                        break;
                }
            }
        }

        return geometry;
    }

    function getMouse(evt) {
        var offsetX, offsetY;
        if (typeof evt.offsetX != 'undefined') {
            offsetX = evt.offsetX;
            offsetY = evt.offsetY;
        } else if (typeof evt.layerX != 'undefined') {
            offsetX = evt.layerX;
            offsetY = evt.layerY;
        }

        return { 'x': offsetX, 'y': offsetY };
    }


    // Handlers
    function _on_mouse_move (e) {
        var mouse = getMouse(e);
        var $this = $(e.target);
        var instance = $this.data('odontogram');

        instance.hoverGeoms = [];

        var teeth, coord, hoverGeoms;
        for (var keyCoord in instance.teeth) {
            teeth = instance.teeth[keyCoord];
            coord = parseKeyCoord(keyCoord);

            switch (instance.mode) {
                case ODONTOGRAM_MODE_NVT: // Kotak
                case ODONTOGRAM_MODE_RCT:
                case ODONTOGRAM_MODE_NON:
                case ODONTOGRAM_MODE_UNE:
                case ODONTOGRAM_MODE_PRE:
                case ODONTOGRAM_MODE_ANO:
                case ODONTOGRAM_MODE_CFR:
                case ODONTOGRAM_MODE_FMC:
                case ODONTOGRAM_MODE_POC:
                case ODONTOGRAM_MODE_RRX:
                case ODONTOGRAM_MODE_MIS:
                case ODONTOGRAM_MODE_IPX:
                case ODONTOGRAM_MODE_HAPUS:
                    if (isRectIntersect(coord, { x1: mouse.x, y1: mouse.y, x2: mouse.x, y2: mouse.y})) {
                        hoverGeoms = [{
                            vertices: [
                                { x: coord.x1, y: coord.y1 },
                                { x: coord.x2, y: coord.y2 }
                            ]
                        }];
                        
                        instance.hoverGeoms = instance.hoverGeoms.concat(hoverGeoms);
                    }
                    break;
                default: // Setiap Bagian
                    if (isRectIntersect(coord, { x1: mouse.x, y1: mouse.y, x2: mouse.x, y2: mouse.y})) {
                        hoverGeoms = getHoverShapeOnTeeth(mouse, teeth);
                        
                        instance.hoverGeoms = instance.hoverGeoms.concat(hoverGeoms);
                    }
                    break;
            }

        }

        if (instance.hoverGeoms.length > 0) {
            $this.css('cursor', 'pointer');
            if (instance.mode == ODONTOGRAM_MODE_HAPUS) {
                $this.css('cursor', 'move');
            } 
        } else {
            $this.css('cursor', 'default');
        }

        instance.redraw();
    }

    function _on_mouse_click (e) {
        var mouse = getMouse(e);
        var $this = $(e.target);
        var instance = $this.data('odontogram');

        if (instance.mode == ODONTOGRAM_MODE_DEFAULT) return;

        var teeth, coord;
        var tempGeoms = {};
        var temp;
        for (var keyCoord in instance.teeth) {
            teeth = instance.teeth[keyCoord];
            coord = parseKeyCoord(keyCoord);

            switch (instance.mode) {
                case ODONTOGRAM_MODE_NVT: // Kotak
                case ODONTOGRAM_MODE_RCT:
                case ODONTOGRAM_MODE_NON:
                case ODONTOGRAM_MODE_UNE:
                case ODONTOGRAM_MODE_PRE:
                case ODONTOGRAM_MODE_ANO:
                case ODONTOGRAM_MODE_CFR:
                case ODONTOGRAM_MODE_FMC:
                case ODONTOGRAM_MODE_POC:
                case ODONTOGRAM_MODE_RRX:
                case ODONTOGRAM_MODE_MIS:
                case ODONTOGRAM_MODE_IPX:
                case ODONTOGRAM_MODE_HAPUS:
                    if (isRectIntersect(coord, { x1: mouse.x, y1: mouse.y, x2: mouse.x, y2: mouse.y})) {
                        tempGeoms[keyCoord] = [convertGeom({
                            vertices: [
                                { x: coord.x1, y: coord.y1 },
                                { x: coord.x2, y: coord.y2 }
                            ]
                        }, instance.mode)];
                    }
                    break;
                default: // Setiap Bagian
                    if (isRectIntersect(coord, { x1: mouse.x, y1: mouse.y, x2: mouse.x, y2: mouse.y})) {
                        tempGeoms[keyCoord] = [];
                        temp = getHoverShapeOnTeeth(mouse, teeth);
                        for (var i = 0; i < temp.length; i++) {
                            tempGeoms[keyCoord].push(convertGeom(temp[i], instance.mode));
                        }
                    }
                    break;
            }

        }

        if (instance.mode == ODONTOGRAM_MODE_HAPUS) {
            for (var keyCoord in tempGeoms) {
                instance.geometry[keyCoord] = [];
            }
        } else {
            instance.geometry = joinShapeTeeth(instance.geometry, tempGeoms);
        }


        instance.redraw();
    }

    $.fn.odontogram.defaults = {
        width: "800px",
        height: "480px"
    }

})( jQuery );