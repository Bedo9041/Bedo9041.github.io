var FauxHollow = {
    setup: function() {
        $('select').change(FauxHollow.calc);
        $('input').change(FauxHollow.calc);
        FauxHollow.calc();
    },
    getState: function() {
        var board = new Array(36);
        var chestCount = 0;
        var swordCount = 0;
        for (var row = 0; row <= 5; row++) {
            for (var col = 0; col <= 5; col++) {
                var index = col + row * 6;
                var val = $('select[row="' + row + '"][col="' + col + '"]').children("option:selected").val();
                if (val === "C") {
                    chestCount++;
                } else if (val === "S") {
                    swordCount++;
                }
                board[index] = val;
            }
        }
        var state = new FauxHollow.State();
        state.board = board;
        state.chestCount = chestCount;
        state.swordCount = swordCount;
        return state;
    },
    calc: function() {
        FauxHollow.clear();
        var state = FauxHollow.getState();
        var board = state.board;
        var chestCount = state.chestCount;
        var swordCount = state.swordCount;
        var solvefor = $('input[name="solvefor"]:checked').val();
        var counts = new Array(36).fill(0);
        switch (solvefor) {
            case "chest":
                for (var row = 0; row <= 4; row++) {
                    for (var col = 0; col <= 4; col++) {
                        var index = col + row * 6;
                        var chestInArea = 0;
                        var accept = true;
                        for (var i = 0; i <= 1; i++) {
                            for (var j = 0; j <= 1; j++) {
                                if (board[index + j + i * 6] === "C") {
                                    chestInArea++;
                                } else if (board[index + j + i * 6] !== "X") {
                                    accept = false;
                                }
                            }
                        }
                        if (accept && chestCount <= chestInArea) {
                            for (var i = 0; i <= 1; i++) {
                                for (var j = 0; j <= 1; j++) {
                                    if (board[index + j + i * 6] !== "C") {
                                        counts[index + j + i * 6] += 1;
                                    }
                                }
                            }
                        }
                    }
                }
                break;
            case "sword":
                for (var row = 0; row <= 3; row++) { // FIRST PASS, LOOKING FOR 3 HIGH, 2 WIDE
                    for (var col = 0; col <= 4; col++) {
                        var index = col + row * 6;
                        var swordInArea = 0;
                        var accept = true;
                        for (var i = 0; i <= 2; i++) {
                            for (var j = 0; j <= 1; j++) {
                                if (board[index + j + i * 6] === "S") {
                                    swordInArea++;
                                } else if (board[index + j + i * 6] !== "X") {
                                    accept = false;
                                }
                            }
                        }
                        if (accept && swordCount <= swordInArea) {
                            for (var i = 0; i <= 2; i++) {
                                for (var j = 0; j <= 1; j++) {
                                    if (board[index + j + i * 6] !== "S") {
                                        counts[index + j + i * 6] += 1;
                                    }
                                }
                            }
                        }
                    }
                }
                for (var row = 0; row <= 4; row++) { // SECOND PASS, LOOKING FOR 2 HIGH, 3 WIDE
                    for (var col = 0; col <= 3; col++) {
                        var index = col + row * 6;
                        var swordInArea = 0;
                        var accept = true;
                        for (var i = 0; i <= 1; i++) {
                            for (var j = 0; j <= 2; j++) {
                                if (board[index + j + i * 6] === "S") {
                                    swordInArea++;
                                } else if (board[index + j + i * 6] !== "X") {
                                    accept = false;
                                }
                            }
                        }
                        if (accept && swordCount <= swordInArea) {
                            for (var i = 0; i <= 1; i++) {
                                for (var j = 0; j <= 2; j++) {
                                    if (board[index + j + i * 6] !== "S") {
                                        counts[index + j + i * 6] += 1;
                                    }
                                }
                            }
                        }
                    }
                }
                break;
            case "both":
                for (var row = 0; row <= 4; row++) {
                    for (var col = 0; col <= 4; col++) {
                        var index = col + row * 6;
                        var chestInArea = 0;
                        var accept = true;
                        for (var i = 0; i <= 1; i++) {
                            for (var j = 0; j <= 1; j++) {
                                if (board[index + j + i * 6] === "C") {
                                    chestInArea++;
                                } else if (board[index + j + i * 6] !== "X") {
                                    accept = false;
                                }
                            }
                        }
                        if (accept && chestCount <= chestInArea) {
                            for (var i = 0; i <= 1; i++) {
                                for (var j = 0; j <= 1; j++) {
                                    if (board[index + j + i * 6] !== "C") {
                                        counts[index + j + i * 6] += 1;
                                    }
                                }
                            }
                        }
                    }
                }
                for (var row = 0; row <= 3; row++) { // FIRST PASS, LOOKING FOR 3 HIGH, 2 WIDE
                    for (var col = 0; col <= 4; col++) {
                        var index = col + row * 6;
                        var swordInArea = 0;
                        var accept = true;
                        for (var i = 0; i <= 2; i++) {
                            for (var j = 0; j <= 1; j++) {
                                if (board[index + j + i * 6] === "S") {
                                    swordInArea++;
                                } else if (board[index + j + i * 6] !== "X") {
                                    accept = false;
                                }
                            }
                        }
                        if (accept && swordCount <= swordInArea) {
                            for (var i = 0; i <= 2; i++) {
                                for (var j = 0; j <= 1; j++) {
                                    if (board[index + j + i * 6] !== "S") {
                                        counts[index + j + i * 6] += 1;
                                    }
                                }
                            }
                        }
                    }
                }
                for (var row = 0; row <= 4; row++) { // SECOND PASS, LOOKING FOR 2 HIGH, 3 WIDE
                    for (var col = 0; col <= 3; col++) {
                        var index = col + row * 6;
                        var swordInArea = 0;
                        var accept = true;
                        for (var i = 0; i <= 1; i++) {
                            for (var j = 0; j <= 2; j++) {
                                if (board[index + j + i * 6] === "S") {
                                    swordInArea++;
                                } else if (board[index + j + i * 6] !== "X") {
                                    accept = false;
                                }
                            }
                        }
                        if (accept && swordCount <= swordInArea) {
                            for (var i = 0; i <= 1; i++) {
                                for (var j = 0; j <= 2; j++) {
                                    if (board[index + j + i * 6] !== "S") {
                                        counts[index + j + i * 6] += 1;
                                    }
                                }
                            }
                        }
                    }
                }
                break;
        }
        var maxval = Math.max(...counts);
        if (maxval !== 0) {
            for (var row = 0; row <= 5; row++) {
                for (var col = 0; col <= 5; col++) {
                    var index = col + row * 6;
                    if (counts[index] == maxval) {
                        $('select[row="' + row + '"][col="' + col + '"]').addClass("recommended");
                    }
                }
            }
        }
    },
    clear: function() {
        $('select').removeClass('recommended');
    },
    reset: function() {
        FauxHollow.clear();
        $('select').prop('selectedIndex',0);
        FauxHollow.calc();
    },
    State: function() {
        this.board = [];
        this.chestCount = 0;
        this.swordCount = 0;
    }
}
$(document).ready(FauxHollow.setup);