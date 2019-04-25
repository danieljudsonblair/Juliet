// Input:  Origin("based on 10.8.18"), Comments("reoptimized 10.17.18"), Addl_Comments("MOMSPOT, SWINGSETUP, MOMCombo"), Adddl_Comments("MomentumFlip, MomentumType, StopLoss"), int MOMSPOT(1), int SWINGSETUP(3), int MSTRMOMSELECT(5), int GoLongShort(3),  Factor4(1), int EntryType(1), int VStratType(1), 
// int Mirror(0), int LookBackDays(0), int MOMCombo(1), int MomentumFlip(1), double MomentumType(2.25), int MSTRMAVDIST(1), double MAVGConfig(1), int MAVG(21), int NthHigh(1), int Agree(1), int AgreeSpacer(1), 
// int Spacing(10), int StartSpacing(2), double MSTRConfig(0), int MSTRSwingHL(21), int SwingHLFilter(6), int PVNumFilter(0), int PVNum(0), int BreakFilter(4), int DailyHLFilter(0), double DHLMult(0), int CenterType(2), int CenterMA(13), double RangeAvg(0), double TRangeAvg(3), double T2RangeAvg(2), double SafetyRangeAvg(2.5), int TExit2(1), int SafetyX(1), 
// double StopLoss(500), int ExitAtTooLate(1), int TooEarly(0001), int TooLate(2329), int TooLateEntry(2359), int ExitonFriday(1), int MAXBARS(500), double OneTick(.25), int MinDailyBars(7), double DollarsPerPt(20);
//ALL THE ABOVE WILL BE SUPPLIED FROM THE CLIENT
var moment = require('moment');
var Size = 25;       // must be divisible by 5


const SZ = 25,      // SET THIS EQUAL TO MAVG SIZE * SMOOTHMAVG SIZE
    MVGSZ = 25,
    MVSZ = 25,     // SET THIS EQUAL TO MAVG SIZE 
    SMSZ = 1,      // SET THIS EQUAL TO SMOOTHMAVG SIZE
    AGMAX = 25,    // SET THIS TO THE DESIRED NUMBER OF MAXIMUM AGREEING STRATEGIES
    AGXSZ = 625,   // SET THIS EQUAL TO AGMAX*SIZE
    SETNUMS = 5;   // SET THIS EQUAL TO NUMBER OF MOMENTUM SETS NATIVE TO THIS PARTICULAR STRATEGY


var OneTick = .25;


var MAXBARS = 500,
    MAVG = 5,
    MSTRMOMSELECT = 0,
    MSTRMAVDIST = 1,
    MAVGConfig = 5,
    MomentumType = 1,
    DollarsPerPt = 20,
    StopLoss = 100,
    StopLossConversion = 0,
    DHLMult = 1,
    DailyHLFilter = 1,
    MinDailyBars = 7,
    TooEarly = 0001,
    TooLate = 2359,
    TooLateEntry = 2359,
    CenterType = 0,
    CenterMA = 20,
    RangeAvg = 1,
    TRangeAvg = 1,
    T2RangeAvg = 1,
    SafetyRangeAvg = 1,
    MSTRSwingHL = 20,
    LookBackDays = 0,
    Factor4 = 1,
    MomentumFlip = 0,
    Agree = 5,
    MOMSPOT = 1,
    SWINGSETUP = 1,
    SwingHLFilter = 0,
    PVNumFilter = 0,
    BreakFilter = 0,
    MSTRConfig = 0,
    MOMCombo = 0,
    Spacing = 10,
    EntryType = 1,
    VStratType = 1,
    SafetyX = 0,
    TExit2 = 0,
    // all above are "dummy" variables and will eventually be supplied by the client ** note they are NOT arrays
    range = [],
    MSTRConfigType = [],
    MOVEUP = [],
    MOVEDN = [],
    PVSwitch = 0,
    PUSHMSTR = [],
    PushFiltType = [],
    PushLookBack = [],
    PushPCT = [],
    SMCLG = [],
    CWHLLB = [],
    PVFilter = [],
    PushType = [],
    PushFlip = [],
    Push = [],
    Mult = [],
    PushLookBackV = [],
    PushLookBackP = [],
    X = [],
    Y = [],
    Z = [],
    VCRWMAPush = [],
    VV = [],
    VCRWeight = [],
    V1L = [],
    P1H = [],

    EntWin = [],
    Valley1 = [],
    Peak1 = [],
    V1 = [],
    V1B = [],
    Valleyqq = [],
    Peakqq = [],
    V2B = [],
    P1B = [],
    P2B = [],
    CWMAV1L = [],
    CWMAP1H = [],
    MP = [],
    DontTradeToday = [],
    CXMA = [],
    XMA13 = [],
    Rang20 = [],
    HiBand20 = [],
    LoBand20 = [],
    THiBand20 = [],
    TLoBand20 = [],
    TRang20 = [],
    SigBarVL = [],
    SHLType = 1,
    Spacing2 = 3,
    SwingHLMult = [],
    SigBarPH = [],
    NTL1 = [],
    NTH1 = [],
    SigBarV = [],
    SigBarP = [],
    DontGoLongq = [],
    DontGoShortq = [],
    StopLossConversion = [],
    DailyBarCounter = [],
    PushFilterB = [],
    TX2Rang20 = [],
    TX2HiBand20 = [],
    TX2LoBand20 = [],
    XDRang20 = [],
    XDHiBand = [],
    XDLoBand = [],
    DayCounter = [],
    Mindays = false,
    SHLROVq = [],
    SHLROVBq = [],
    SLLROVq = [],
    SLLROVBq = [],
    SHHROVq = [],
    SHHROVBq = [],
    SHROVq = [],
    SLROVq = [],
    EntryPriceL = [],
    EntryPriceS = [],
    SCW = [],
    BarCenter = [],
    CWCenter = [],
    SigBarPH2qq = [],
    SigBarVL2qq = [],
    MAVGPqq1 = [],
    MAVGVqq1 = [],
    SigL = [],
    SigBarL = [],
    EntrylevelL = [],
    EntryBarL = [],
    TExit2L = [],
    TEx2it2L = [],
    TEx3it2L = [],
    Exit2L = [],
    Exit2S = [],
    SigS = [],
    SigBarS = [],
    EntrylevelS = [],
    EntryBarS = [],
    TExit2S = [],
    TEx2it2S = [],
    TEx3it2S = [],
    MAXBARSMET = [],
    ET2L = [],
    EntryLevel2L = [],
    EntryBar2L = [],
    ET2S = [],
    EntryLevel2S = [],
    EntryBar2S = [],
    Ex2it2S = [],
    Ex2it2L = [],
    TouchXL = [],
    TouchXS = [],
    DontRTradeToday = [],
    Config0 = false,
    Config1 = [],
    Config2 = [],
    Config3L = [],
    Config3S = [],
    SHLROVqq = [],
    SLROVqq = [],
    SHLROVBqq = [],
    SLLROVBqq = [],
    SHROVqq = [],
    SHHROVBqq = [],
    Stretch = [],
    Config4L = [],
    Config4S = [],
    AGL = [],
    AGS = [],
    AGLqq = [],
    AGSqq = [],
    VMindays = [],
    VMinDaysCtr = [],
    BF0 = [],
    BF1L = [],
    BF2L = [],
    BF1S = [],
    BF2S = [],
    PNum = [],
    VNum = [],
    PVFilterLq = [],
    PVFilterSq = [],
    AGLPVqq = [],
    AGSPVqq = [],
    ET3L = [],
    ET3S = [],
    LEntThresh = [],
    SEntThresh = [],
    DHLFL = [],
    DHLFS = [],
    DHLFSMult = [],
    DHLFLMult = [],
    DHLFSMultB = [],
    DHLFLMultB = [],
    DHLFSMultC = [],
    DHLFLMultC = [],
    HighDqq = [],
    LowDqq = [],
    HighD1qq = [],
    LowD1qq = [],
    VMindaysCtr = [],
    HighDq = [],
    LowDq = [],
    HighD1q = [],
    LowD1q = [],
    DHMult = [],

    //Arrays

    MOMComboL = [],
    MOMComboS = [],
    MAVGq = [],
    SigBarVq = [],
    SigBarPq = [],
    SigBarVPq = [],
    SigBarPVq = [],
    SigBarPqp = [],
    SigBarVqp = [],
    SigBarCWVLq = [],
    SigBarCWVLqB = [],
    SigBarCWPHq = [],
    SigBarCWPHqB = [],
    VCRWMALq = [],
    VCRWMASq = [],
    VCRWMALqB = [],
    VCRWMASqB = [],
    SmoothCWVq = [],
    SmoothCWPq = [],
    VCRWMALqq = [],
    VCRWMASqq = [],
    SigBarPV2q = [],
    SigBarVP2q = [],
    VCRWMALqqqq = [],
    VCRWMASqqqq = [],
    CumProfitsL2q = [],
    CumProfitsS2q = [],
    CumProfitsL3q = [],
    CumProfitsS3q = [],
    CumProfitsL4q = [],
    CumProfitsS4q = [],
    CumProfitsL5q = [],
    CumProfitsS5 = [],
    CumProfitsL6 = [],
    CumProfitsS6 = [],
    CumProfitsL7 = [],
    CumProfitsS7 = [],
    CumProfitsL8 = [],
    CumProfitsS8 = [],
    CumProfitsL9 = [],
    CumProfitsS9 = [],
    CumProfitsL10 = [],
    CumProfitsS10 = [],
    CumProfitsL11 = [],
    CumProfitsS11 = [],
    CumProfitsL12 = [],
    CumProfitsS12 = [],
    CumProfitsL13 = [],
    CumProfitsS13 = [],
    CumProfitsL14 = [],
    CumProfitsS14 = [],
    CumProfitsL15 = [],
    CumProfitsS15 = [],
    CumProfitsL1 = [],
    CumProfitsS1 = [],
    CumProfitsLqq = [],
    CumProfitsSqq = [],
    SigBarPHq = [],
    SigBarVLq = [],
    CumProfitsL = [],
    CumProfitsS = [],
    BestHolderLq = [],
    BestHolderSq = [],
    RVCRWMALq = [],
    RVCRWMALqB = [],
    RVCRWMASq = [],
    RVCRWMASqB = [],
    CWMAV1Lq = [],
    CWMAV1LqB = [],
    CWMAP1Hq = [],
    CWMAP1HqB = [],
    AGLq = [],
    AGSq = [],
    VCRWMALNumq = [],
    VCRWMASNumq = [],
    MAVGVq = [],
    MAVGPq = [],
    Vq = [],
    Pq = [],
    MAVGVqMul = [],
    MAVGPqMul = [],
    MPLq = [],
    EntryLevelL = [],
    LTradeNetProfit = [],
    SigBarLq = [],
    SigLq = [],
    Exit2Lq = [],
    TExit2Lq = [],
    MPS = [],
    EntryLevelS = [],
    STradeNetProfit = [],
    SigBarS = [],
    SigS = [],
    Exit2S = [],
    TExit2S = [],
    UpROVq = [],
    DnROVq = [],
    UpROVXLq = [],
    DnROVXLq = [],
    UpVVq = [],
    DnVVq = [],
    UpRGq = [],
    DnRGq = [],
    UpRTVq = [],
    DnRTVq = [],
    UpMoveq = [],
    DnMoveq = [],
    SigBarVqq = [],
    SigBarPqq = [],
    SigBarPHqq = [],
    SigBarVLqq = [],
    SigBarVPqp = [],
    SigBarPVqp = [],
    SigBarVL2q = [],
    SigBarPH2q = [],
    UpMvDnTq = [],
    UpMvUpTq = [],
    DnMvDnTq = [],
    DnMvUpTq = [],
    UpHiq = [],
    UpLoq = [],
    DnHiq = [],
    DnLoq = [],
    UpCWq = [],
    DnCWq = [],
    DontGoLong = [],
    DontGoShort = [],
    PMOM = [],
    PMOM1 = [],
    PMOM1B = [],
    VMOM = [],
    VMOM1 = [],
    VMOM1B = [],
    PMOM = [],
    PMOM2 = [],
    PMOM2B = [],
    VMOM = [],
    VMOM2 = [],
    VMOM2B = [],
    PVFilterL = [],
    PVFilterS = [],
    RVMOM1 = [],
    RVMOM1B = [],
    RVMOM2 = [],
    RVMOM2B = [],
    RPMOM1 = [],
    RPMOM1B = [],
    RPMOM2 = [],
    RPMOM2B = [],
    AGPVSq = [],
    AGPVLq = [],
    PVFilterLqq = [],
    PVFilterSqq = [],
    PushVCRWMAL = [],
    PushVCRWMAS = [],
    PushDiffL = [],
    PushDiffS = [],
    PushPCTL = [],
    PushPCTS = [],
    PushL = [],
    PushS = [],
    RPushPCTLq = [],
    RPushPCTSq = [],
    CandleWeight = [],
    CWfactor = 1,
    OneTickfactor = .33,
    OCRange = [],
    x = 0,
    ThisBar = 0,


    data = [{
        Open: 169.16,
        Close: 167.10,
        High: 169.22,
        Low: 165.64,
        Volume: 71395061
    },
    {
        Open: 167.10,
        Close: 167.65,
        High: 168.04,
        Low: 166.61,
        Volume: 34075664
    },
    {
        Open: 167.23,
        Close: 166.92,
        High: 168.76,
        Low: 166.19,
        Volume: 43863543
    },
    {
        Open: 164.70,
        Close: 162.80,
        High: 165.77,
        Low: 162.59,
        Volume: 66607288
    },
    {
        Open: 162.60,
        Close: 158.51,
        High: 163.30,
        Low: 158.43,
        Volume: 80110392
    },
    {
        Open: 161.68,
        Close: 164.40,
        High: 164.60,
        Low: 159.16,
        Volume: 57481503
    },
    {
        Open: 165.60,
        Close: 159.08,
        High: 165.62,
        Low: 157.68,
        Volume: 78889105
    },
    {
        Open: 158.25,
        Close: 157.25,
        High: 159.78,
        Low: 156.04,
        Volume: 89369655
    },
    {
        Open: 158.13,
        Close: 160.13,
        High: 161.71,
        Low: 156.63,
        Volume: 68692566
    },
    {
        Open: 159.00,
        Close: 155.51,
        High: 159.74,
        Low: 153.88,
        Volume: 85549443
    },
    {
        Open: 156.92,
        Close: 157.26,
        High: 157.92,
        Low: 154.44,
        Volume: 64090049
    },
    {
        Open: 154.27,
        Close: 159.74,
        High: 160.23,
        Low: 154.04,
        Volume: 65768692
    },
    {
        Open: 161.33,
        Close: 160.65,
        High: 161.58,
        Low: 159.48,
        Volume: 43054868
    },
    {
        Open: 158.94,
        Close: 156.63,
        High: 160.46,
        Low: 155.88,
        Volume: 59870865
    },
    {
        Open: 158.01,
        Close: 157.73,
        High: 160.88,
        Low: 157.46,
        Volume: 41810380
    },
    {
        Open: 160.13,
        Close: 161.21,
        High: 161.73,
        Low: 159.07,
        Volume: 48601323
    },
    {
        Open: 160.20,
        Close: 160.28,
        High: 162.00,
        Low: 160.10,
        Volume: 41622139
    },
    {
        Open: 161.30,
        Close: 162.21,
        High: 162.77,
        Low: 161.16,
        Volume: 30467889
    },
    {
        Open: 163.01,
        Close: 161.37,
        High: 163.26,
        Low: 160.67,
        Volume: 44604892
    },
    {
        Open: 162.45,
        Close: 162.60,
        High: 163.19,
        Low: 161.48,
        Volume: 28180780
    },
    {
        Open: 164.19,
        Close: 166.10,
        High: 166.46,
        Low: 163.91,
        Volume: 35536087
    },
    {
        Open: 166.12,
        Close: 166.44,
        High: 167.00,
        Low: 165.31,
        Volume: 29573880
    },
    {
        Open: 165.65,
        Close: 164.91,
        High: 165.99,
        Low: 164.34,
        Volume: 34705692
    },
    {
        Open: 164.49,
        Close: 162.30,
        High: 164.61,
        Low: 161.73,
        Volume: 49197140
    },
    {
        Open: 163.08,
        Close: 161.89,
        High: 163.73,
        Low: 161.02,
        Volume: 33040646
    },
    {
        Open: 162.62,
        Close: 158.46,
        High: 162.91,
        Low: 157.39,
        Volume: 70256751
    },
    {
        Open: 158.80,
        Close: 158.65,
        High: 159.31,
        Low: 156.47,
        Volume: 52089323
    },
    {
        Open: 160.72,
        Close: 161.99,
        High: 162.53,
        Low: 160.18,
        Volume: 43005532
    },
    {
        Open: 164.35,
        Close: 162.09,
        High: 164.41,
        Low: 161.17,
        Volume: 51043406
    },
    {
        Open: 162.48,
        Close: 160.94,
        High: 163.48,
        Low: 160.54,
        Volume: 35615273
    },
    {
        Open: 160.52,
        Close: 162.78,
        High: 162.80,
        Low: 160.14,
        Volume: 36513529
    },
    {
        Open: 163.10,
        Close: 161.82,
        High: 163.57,
        Low: 161.63,
        Volume: 38646842
    },
    {
        Open: 161.08,
        Close: 161.80,
        High: 162.40,
        Low: 159.22,
        Volume: 60337134
    },
    {
        Open: 161.11,
        Close: 164.87,
        High: 165.25,
        Low: 160.98,
        Volume: 41543243
    },
    {
        Open: 165.64,
        Close: 166.24,
        High: 166.78,
        Low: 165.51,
        Volume: 32500152
    },
    {
        Open: 165.83,
        Close: 166.07,
        High: 166.43,
        Low: 164.86,
        Volume: 26040170
    },
    {
        Open: 166.40,
        Close: 167.88,
        High: 168.00,
        Low: 165.78,
        Volume: 29122718
    },
    {
        Open: 168.43,
        Close: 169.62,
        High: 169.74,
        Low: 168.29,
        Volume: 27067597
    },
    {
        Open: 169.35,
        Close: 169.46,
        High: 169.86,
        Low: 168.72,
        Volume: 24688847
    },
    {
        Open: 169.84,
        Close: 169.75,
        High: 170.82,
        Low: 169.47,
        Volume: 21821749
    },
    {
        Open: 168.40,
        Close: 167.87,
        High: 168.50,
        Low: 166.98,
        Volume: 49361638
    },
    {
        Open: 168.10,
        Close: 168.98,
        High: 169.37,
        Low: 168.01,
        Volume: 22941159
    },
    {
        Open: 168.40,
        Close: 168.33,
        High: 169.61,
        Low: 167.51,
        Volume: 27480164
    },
    {
        Open: 167.71,
        Close: 167.46,
        High: 168.26,
        Low: 167.21,
        Volume: 26217939
    },
    {
        Open: 168.73,
        Close: 168.40,
        High: 169.50,
        Low: 167.68,
        Volume: 22954565
    },
    {
        Open: 169.15,
        Close: 168.18,
        High: 169.45,
        Low: 167.88,
        Volume: 19477721
    },
    {
        Open: 166.90,
        Close: 169.60,
        High: 169.62,
        Low: 166.88,
        Volume: 26557835
    },
    {
        Open: 169.56,
        Close: 169.55,
        High: 169.85,
        Low: 167.84,
        Volume: 27696539
    },
    {
        Open: 169.54,
        Close: 169.72,
        High: 170.33,
        Low: 169.21,
        Volume: 27460536
    },
    {
        Open: 168.91,
        Close: 168.97,
        High: 169.92,
        Low: 167.96,
        Volume: 41220468
    },
    {
        Open: 169.63,
        Close: 170.18,
        High: 170.48,
        Low: 169.22,
        Volume: 22665836
    },
    {
        Open: 170.13,
        Close: 170.07,
        High: 171.20,
        Low: 169.63,
        Volume: 35670946
    },
    {
        Open: 170.88,
        Close: 172.74,
        High: 172.84,
        Low: 170.87,
        Volume: 45543331
    },
    {
        Open: 173.16,
        Close: 174.30,
        High: 174.34,
        Low: 173.07,
        Volume: 20459634
    },
    {
        Open: 174.69,
        Close: 174.84,
        High: 175.13,
        Low: 174.07,
        Volume: 24779284
    },
    {
        Open: 175.02,
        Close: 175.86,
        High: 175.89,
        Low: 174.14,
        Volume: 25036647
    },
    {
        Open: 175.91,
        Close: 174.43,
        High: 175.93,
        Low: 173.55,
        Volume: 39600316
    },
    {
        Open: 173.57,
        Close: 174.44,
        High: 174.88,
        Low: 173.18,
        Volume: 31780348
    },
    {
        Open: 174.30,
        Close: 174.91,
        High: 175.34,
        Low: 174.28,
        Volume: 22319709
    },
    {
        Open: 175.15,
        Close: 175.83,
        High: 176.00,
        Low: 174.96,
        Volume: 22511832
    },
    {
        Open: 176.09,
        Close: 175.82,
        High: 177.14,
        Low: 175.43,
        Volume: 37858584
    },
    {
        Open: 176.62,
        Close: 177.60,
        High: 177.89,
        Low: 176.50,
        Volume: 35915978
    },
    {
        Open: 176.98,
        Close: 176.98,
        High: 177.33,
        Low: 176.11,
        Volume: 49615730
    },
    {
        Open: 175.53,
        Close: 176.50,
        High: 176.65,
        Low: 174.94,
        Volume: 31633192
    },
    {
        Open: 174.26,
        Close: 176.00,
        High: 176.04,
        Low: 173.71,
        Volume: 38235994
    },
    {
        Open: 176.79,
        Close: 177.25,
        High: 177.98,
        Low: 176.65,
        Volume: 33038042
    },
    {
        Open: 177.69,
        Close: 175.71,
        High: 177.88,
        Low: 175.37,
        Volume: 43469439
    },
    {
        Open: 176.31,
        Close: 175.32,
        High: 176.37,
        Low: 174.69,
        Volume: 30073187
    },
    {
        Open: 173.76,
        Close: 171.37,
        High: 173.99,
        Low: 169.81,
        Volume: 77799725
    },
    {
        Open: 171.99,
        Close: 172.07,
        High: 173.06,
        Low: 171.37,
        Volume: 39008146
    },
    {
        Open: 172.77,
        Close: 169.73,
        High: 173.58,
        Low: 169.61,
        Volume: 52843497
    },
    {
        Open: 169.52,
        Close: 171.19,
        High: 171.77,
        Low: 169.17,
        Volume: 46407708
    },
    {
        Open: 172.00,
        Close: 171.65,
        High: 172.92,
        Low: 171.40,
        Volume: 36408464
    },
    {
        Open: 170.04,
        Close: 172.80,
        High: 172.85,
        Low: 169.67,
        Volume: 31770026
    },
    {
        Open: 173.41,
        Close: 170.80,
        High: 173.45,
        Low: 170.63,
        Volume: 25512707
    },
    {
        Open: 171.91,
        Close: 172.92,
        High: 173.06,
        Low: 171.03,
        Volume: 31626198
    },
    {
        Open: 173.31,
        Close: 175.61,
        High: 175.74,
        Low: 173.00,
        Volume: 37005574
    },
    {
        Open: 176.49,
        Close: 177.19,
        High: 177.23,
        Low: 175.82,
        Volume: 27362061
    },
    {
        Open: 177.41,
        Close: 177.32,
        High: 177.72,
        Low: 176.71,
        Volume: 23902488
    },
    {
        Open: 175.96,
        Close: 176.42,
        High: 177.07,
        Low: 175.80,
        Volume: 30280553
    },
    {
        Open: 177.21,
        Close: 179.46,
        High: 179.46,
        Low: 177.08,
        Volume: 27930119
    },
    {
        Open: 179.42,
        Close: 179.61,
        High: 179.90,
        Low: 178.95,
        Volume: 28067961
    },
    {
        Open: 179.64,
        Close: 179.18,
        High: 179.95,
        Low: 178.88,
        Volume: 21405310
    },
    {
        Open: 177.30,
        Close: 180.27,
        High: 180.65,
        Low: 177.28,
        Volume: 31034075
    },
    {
        Open: 180.28,
        Close: 179.93,
        High: 180.44,
        Low: 179.38,
        Volume: 23220839
    },
    {
        Open: 179.34,
        Close: 179.03,
        High: 179.88,
        Low: 178.82,
        Volume: 31094145
    },
    {
        Open: 179.57,
        Close: 178.99,
        High: 180.17,
        Low: 178.79,
        Volume: 35907619
    },
    {
        Open: 178.45,
        Close: 179.56,
        High: 179.64,
        Low: 177.74,
        Volume: 22184720
    },
    {
        Open: 181.39,
        Close: 180.30,
        High: 182.05,
        Low: 179.56,
        Volume: 36900281
    },
    {
        Open: 180.36,
        Close: 182.82,
        High: 182.93,
        Low: 180.29,
        Volume: 36022078
    },
    {
        Open: 180.35,
        Close: 180.05,
        High: 180.92,
        Low: 179.81,
        Volume: 40873485
    },
    {
        Open: 181.26,
        Close: 177.62,
        High: 181.31,
        Low: 176.60,
        Volume: 59456093
    },
    {
        Open: 177.66,
        Close: 175.11,
        High: 177.73,
        Low: 174.27,
        Volume: 60192990
    },
    {
        Open: 175.75,
        Close: 176.45,
        High: 177.13,
        Low: 174.82,
        Volume: 47285135
    },
    {
        Open: 176.87,
        Close: 177.12,
        High: 177.65,
        Low: 176.10,
        Volume: 37101925
    },
    {
        Open: 175.87,
        Close: 179.53,
        High: 179.74,
        Low: 175.79,
        Volume: 47178229
    },
    {
        Open: 179.80,
        Close: 180.08,
        High: 180.09,
        Low: 179.08,
        Volume: 28934445
    },
    {
        Open: 179.97,
        Close: 181.14,
        High: 181.19,
        Low: 179.74,
        Volume: 24808763
    },
    {
        Open: 181.63,
        Close: 181.80,
        High: 182.14,
        Low: 181.26,
        Volume: 29895664
    },
    {
        Open: 181.55,
        Close: 182.02,
        High: 182.35,
        Low: 181.06,
        Volume: 22680749
    },
    {
        Open: 181.94,
        Close: 181.91,
        High: 182.63,
        Low: 181.64,
        Volume: 18852898
    },
    {
        Open: 180.68,
        Close: 180.52,
        High: 181.22,
        Low: 179.84,
        Volume: 33818464
    },
    {
        Open: 180.85,
        Close: 180.32,
        High: 182.01,
        Low: 180.24,
        Volume: 26089195
    },
    {
        Open: 181.01,
        Close: 181.45,
        High: 181.66,
        Low: 180.04,
        Volume: 20913021
    },
    {
        Open: 180.09,
        Close: 179.23,
        High: 180.58,
        Low: 178.12,
        Volume: 58528016
    },
    {
        Open: 180.57,
        Close: 179.82,
        High: 180.99,
        Low: 179.47,
        Volume: 27711761
    },
    {
        Open: 179.36,
        Close: 179.86,
        High: 180.31,
        Low: 178.27,
        Volume: 36092641
    },
    {
        Open: 180.28,
        Close: 179.70,
        High: 180.33,
        Low: 179.00,
        Volume: 24938956
    },
    {
        Open: 180.26,
        Close: 180.36,
        High: 181.44,
        Low: 180.13,
        Volume: 26258657
    },
    {
        Open: 179.96,
        Close: 181.06,
        High: 181.27,
        Low: 179.75,
        Volume: 18042380
    },
    {
        Open: 180.77,
        Close: 180.80,
        High: 182.05,
        Low: 180.50,
        Volume: 25776166
    },
    {
        Open: 181.40,
        Close: 182.48,
        High: 182.63,
        Low: 181.36,
        Volume: 23136113
    },
    {
        Open: 183.43,
        Close: 184.34,
        High: 184.34,
        Low: 183.11,
        Volume: 29343552
    },
    {
        Open: 184.80,
        Close: 184.61,
        High: 185.02,
        Low: 184.22,
        Volume: 20277036
    },
    {
        Open: 184.91,
        Close: 186.74,
        High: 186.84,
        Low: 184.86,
        Volume: 29175591
    },
    {
        Open: 186.41,
        Close: 186.41,
        High: 187.52,
        Low: 185.79,
        Volume: 29315453
    },
    {
        Open: 186.18,
        Close: 186.65,
        High: 187.18,
        Low: 185.98,
        Volume: 28653248
    },
    {
        Open: 186.10,
        Close: 185.85,
        High: 186.40,
        Low: 184.85,
        Volume: 29063537
    },
    {
        Open: 185.55,
        Close: 183.45,
        High: 185.55,
        Low: 182.82,
        Volume: 42623326
    },
    {
        Open: 183.54,
        Close: 181.81,
        High: 183.75,
        Low: 180.58,
        Volume: 46091403
    },
    {
        Open: 180.53,
        Close: 181.11,
        High: 182.67,
        Low: 180.44,
        Volume: 46629495
    },
    {
        Open: 182.12,
        Close: 181.72,
        High: 182.25,
        Low: 180.73,
        Volume: 26131977
    },
    {
        Open: 180.97,
        Close: 183.12,
        High: 183.42,
        Low: 180.52,
        Volume: 30116460
    },
    {
        Open: 182.87,
        Close: 182.58,
        High: 182.98,
        Low: 181.01,
        Volume: 36203973
    },
    {
        Open: 183.67,
        Close: 184.53,
        High: 184.88,
        Low: 183.64,
        Volume: 31133188
    },
    {
        Open: 184.66,
        Close: 183.99,
        High: 184.95,
        Low: 183.26,
        Volume: 31224132
    },
    {
        Open: 183.66,
        Close: 181.34,
        High: 183.81,
        Low: 181.17,
        Volume: 33071197
    },
    {
        Open: 181.52,
        Close: 182.84,
        High: 183.73,
        Low: 181.40,
        Volume: 31877347
    },
    {
        Open: 182.86,
        Close: 182.70,
        High: 183.30,
        Low: 181.51,
        Volume: 31843377
    },
    {
        Open: 183.95,
        Close: 184.72,
        High: 184.97,
        Low: 183.52,
        Volume: 33295820
    },
    {
        Open: 185.27,
        Close: 183.71,
        High: 185.48,
        Low: 183.48,
        Volume: 38605353
    },
    {
        Open: 182.05,
        Close: 183.89,
        High: 183.96,
        Low: 181.30,
        Volume: 34945602
    },
    {
        Open: 183.78,
        Close: 184.14,
        High: 184.28,
        Low: 183.18,
        Volume: 25277520
    },
    {
        Open: 184.25,
        Close: 184.27,
        High: 185.99,
        Low: 183.91,
        Volume: 36210571
    },
    {
        Open: 185.04,
        Close: 185.83,
        High: 186.49,
        Low: 184.92,
        Volume: 33113269
    },
    {
        Open: 185.25,
        Close: 185.79,
        High: 186.28,
        Low: 184.97,
        Volume: 28076843
    },
    {
        Open: 186.82,
        Close: 186.17,
        High: 187.53,
        Low: 185.70,
        Volume: 27371297
    },
    {
        Open: 185.95,
        Close: 185.75,
        High: 187.18,
        Low: 185.32,
        Volume: 25618608
    },
    {
        Open: 186.52,
        Close: 185.95,
        High: 186.97,
        Low: 185.66,
        Volume: 29128683
    },
    {
        Open: 185.22,
        Close: 182.38,
        High: 185.32,
        Low: 181.06,
        Volume: 80557283
    },
    {
        Open: 182.39,
        Close: 180.15,
        High: 182.97,
        Low: 178.43,
        Volume: 83325630
    },
    {
        Open: 179.37,
        Close: 179.05,
        High: 180.64,
        Low: 176.93,
        Volume: 66864481
    },
    {
        Open: 179.20,
        Close: 179.63,
        High: 181.02,
        Low: 178.75,
        Volume: 49097949
    },
    {
        Open: 178.53,
        Close: 171.73,
        High: 178.62,
        Low: 171.50,
        Volume: 11447105
    },
    {
        Open: 171.04,
        Close: 169.60,
        High: 173.40,
        Low: 167.81,
        Volume: 14308446
    },
    {
        Open: 173.99,
        Close: 174.32,
        High: 174.86,
        Low: 170.93,
        Volume: 10207838
    },
    {
        Open: 173.69,
        Close: 172.21,
        High: 174.04,
        Low: 171.56,
        Volume: 64885255
    },
    {
        Open: 174.02,
        Close: 177.22,
        High: 177.65,
        Low: 173.70,
        Volume: 71979688
    },
    {
        Open: 178.14,
        Close: 177.29,
        High: 178.26,
        Low: 175.47,
        Volume: 66987639
    },
    {
        Open: 176.60,
        Close: 173.18,
        High: 176.68,
        Low: 172.44,
        Volume: 82486208
    },
    {
        Open: 174.39,
        Close: 173.02,
        High: 176.07,
        Low: 172.39,
        Volume: 82923733
    },
    {
        Open: 174.06,
        Close: 173.91,
        High: 175.25,
        Low: 172.59,
        Volume: 52909281
    },
    {
        Open: 170.79,
        Close: 173.27,
        High: 174.13,
        Low: 168.82,
        Volume: 77566972
    },
    {
        Open: 173.12,
        Close: 165.34,
        High: 173.36,
        Low: 165.04,
        Volume: 10299744
    },
    {
        Open: 167.99,
        Close: 171.06,
        High: 172.08,
        Low: 167.16,
        Volume: 83481070
    },
    {
        Open: 165.24,
        Close: 166.66,
        High: 169.96,
        Low: 164.23,
        Volume: 13097090

    },
    {
        Open: 169.16,
        Close: 163.23,
        High: 169.86,
        Low: 160.09,
        Volume: 11187193
    },
    {
        Open: 162.80,
        Close: 165.92,
        High: 166.04,
        Low: 162.01,
        Volume: 92583965
    },
    {
        Open: 168.55,
        Close: 169.82,
        High: 171.25,
        Low: 168.54,
        Volume: 73828635
    },
    {
        Open: 170.08,
        Close: 172.06,
        High: 172.24,
        Low: 168.78,
        Volume: 52706823
    },
    {
        Open: 171.53,
        Close: 169.38,
        High: 172.55,
        Low: 168.22,
        Volume: 75966781
    },
    {
        Open: 169.61,
        Close: 168.96,
        High: 169.66,
        Low: 167.08,
        Volume: 39573533
    },
    {
        Open: 168.93,
        Close: 170.24,
        High: 171.19,
        Low: 168.72,
        Volume: 34410390
    },
    {
        Open: 172.25,
        Close: 175.58,
        High: 175.58,
        Low: 171.87,
        Volume: 51169614
    },
    {
        Open: 174.76,
        Close: 174.46,
        High: 175.30,
        Low: 173.63,
        Volume: 40296538
    },
    {
        Open: 172.83,
        Close: 171.52,
        High: 173.25,
        Low: 170.16,
        Volume: 50602710
    },
    {
        Open: 170.33,
        Close: 166.33,
        High: 170.64,
        Low: 166.18,
        Volume: 62578371
    },
    {
        Open: 167.15,
        Close: 166.47,
        High: 169.48,
        Low: 166.00,
        Volume: 64128079
    },
    {
        Open: 168.09,
        Close: 165.20,
        High: 168.70,
        Low: 164.25,
        Volume: 75270714
    },
    {
        Open: 164.84,
        Close: 168.09,
        High: 168.54,
        Low: 163.46,
        Volume: 73254349
    },
    {
        Open: 166.49,
        Close: 167.50,
        High: 168.31,
        Low: 165.78,
        Volume: 65390675
    },
    {
        Open: 166.74,
        Close: 162.06,
        High: 166.90,
        Low: 161.54,
        Volume: 67280478
    },
    {
        Open: 158.37,
        Close: 159.16,
        High: 161.38,
        Low: 157.13,
        Volume: 10265279
    },
    {
        Open: 161.29,
        Close: 160.37,
        High: 161.97,
        Low: 159.23,
        Volume: 42965839
    },
    {
        Open: 159.09,
        Close: 159.21,
        High: 160.84,
        Low: 159.09,
        Volume: 23503729
    },
    {
        Open: 161.44,
        Close: 162.89,
        High: 162.97,
        Low: 160.76,
        Volume: 42012633
    },
    {
        Open: 162.00,
        Close: 163.44,
        High: 163.85,
        Low: 161.18,
        Volume: 36608063
    },
    {
        Open: 164.62,
        Close: 168.70,
        High: 168.70,
        Low: 163.47,
        Volume: 70140986
    },
    {
        Open: 168.00,
        Close: 168.15,
        High: 169.26,
        Low: 166.82,
        Volume: 44885711
    },
    {
        Open: 168.38,
        Close: 169.37,
        High: 169.47,
        Low: 167.54,
        Volume: 36722760
    },
    {
        Open: 173.10,
        Close: 172.33,
        High: 173.31,
        Low: 169.51,
        Volume: 50771695
    },
    {
        Open: 171.38,
        Close: 165.72,
        High: 171.91,
        Low: 165.52,
        Volume: 70594743
    },
    {
        Open: 162.46,
        Close: 166.89,
        High: 166.91,
        Low: 161.77,
        Volume: 71715526
    },
    {
        Open: 166.13,
        Close: 161.38,
        High: 167.12,
        Low: 160.86,
        Volume: 80432176
    },
    {
        Open: 161.11,
        Close: 163.07,
        High: 163.78,
        Low: 159.41,
        Volume: 73960758
    },
    {
        Open: 165.66,
        Close: 163.61,
        High: 165.77,
        Low: 162.23,
        Volume: 59058296
    },
    {
        Open: 166.06,
        Close: 165.05,
        High: 167.60,
        Low: 164.96,
        Volume: 53779992
    },
    {
        Open: 166.06,
        Close: 165.10,
        High: 166.82,
        Low: 164.03,
        Volume: 46377864
    },
    {
        Open: 163.19,
        Close: 161.08,
        High: 163.81,
        Low: 160.70,
        Volume: 56547419
    },
    {
        Open: 160.41,
        Close: 157.43,
        High: 161.67,
        Low: 156.17,
        Volume: 74834076
    },
    {
        Open: 158.67,
        Close: 158.42,
        High: 159.95,
        Low: 157.04,
        Volume: 63642120
    },
    {
        Open: 158.24,
        Close: 154.53,
        High: 160.72,
        Low: 153.34,
        Volume: 81856456
    },
    {
        Open: 154.16,
        Close: 152.29,
        High: 155.87,
        Low: 150.39,
        Volume: 99002139
    },
    {
        Open: 153.06,
        Close: 147.57,
        High: 154.09,
        Low: 146.72,
        Volume: 14112940
    },
    {
        Open: 146.14,
        Close: 143.50,
        High: 147.98,
        Low: 143.46,
        Volume: 56163290
    },
    {
        Open: 145.12,
        Close: 152.46,
        High: 152.54,
        Low: 144.09,
        Volume: 98982064
    },
    {
        Open: 150.57,
        Close: 153.05,
        High: 153.18,
        Low: 147.08,
        Volume: 85824343
    },
    {
        Open: 154.01,
        Close: 152.97,
        High: 155.59,
        Low: 151.72,
        Volume: 77856625
    },
    {
        Open: 154.47,
        Close: 154.26,
        High: 154.98,
        Low: 152.71,
        Volume: 53015313
    },
    {
        Open: 150.99,
        Close: 154.88,
        High: 155.75,
        Low: 150.88,
        Volume: 58576672
    },
    {
        Open: 152.60,
        Close: 149.82,
        High: 153.26,
        Low: 149.49,
        Volume: 74820225
    },
    {
        Open: 152.18,
        Close: 156.23,
        High: 157.00,
        Low: 151.74,
        Volume: 74709320
    },
    {
        Open: 156.54,
        Close: 158.09,
        High: 158.86,
        Low: 156.11,
        Volume: 52059331
    },
    {
        Open: 159.56,
        Close: 159.52,
        High: 160.11,
        Low: 157.20,
        Volume: 49388694
    },
    {
        Open: 160.15,
        Close: 160.82,
        High: 161.52,
        Low: 159.47,
        Volume: 46491747
    },
    {
        Open: 159.59,
        Close: 161.28,
        High: 161.37,
        Low: 158.70,
        Volume: 38943414
    },
    {
        Open: 160.32,
        Close: 160.69,
        High: 160.86,
        Low: 159.79,
        Volume: 30176643
    },
    {
        Open: 159.32,
        Close: 159.27,
        High: 159.96,
        Low: 158.59,
        Volume: 30710234
    },
    {
        Open: 159.97,
        Close: 162.38,
        High: 162.60,
        Low: 159.91,
        Volume: 40874224
    },
    {
        Open: 162.63,
        Close: 162.35,
        High: 163.78,
        Low: 162.29,
        Volume: 33812190
    },
    {
        Open: 161.84,
        Close: 163.63,
        High: 164.36,
        Low: 161.57,
        Volume: 39328959
    },
    {
        Open: 164.84,
        Close: 165.25,
        High: 166.02,
        Low: 163.82,
        Volume: 57183243
    },
    {
        Open: 164.05,
        Close: 161.94,
        High: 164.14,
        Low: 160.76,
        Volume: 56711694
    },
    {
        Open: 162.77,
        Close: 162.15,
        High: 163.51,
        Low: 160.32,
        Volume: 38106062
    },
    {
        Open: 162.66,
        Close: 163.20,
        High: 163.44,
        Low: 162.06,
        Volume: 32413351
    },
    {
        Open: 164.48,
        Close: 165.15,
        High: 165.65,
        Low: 163.95,
        Volume: 36466069
    },
    {
        Open: 163.03,
        Close: 163.11,
        High: 163.12,
        Low: 161.75,
        Volume: 33491216
    },
    {
        Open: 163.20,
        Close: 161.57,
        High: 163.24,
        Low: 160.99,
        Volume: 30784175
    },
    {
        Open: 163.39,
        Close: 165.68,
        High: 166.28,
        Low: 162.89,
        Volume: 41346533
    },
    {
        Open: 166.65,
        Close: 168.16,
        High: 168.99,
        Low: 166.47,
        Volume: 37258361
    },
    {
        Open: 167.37,
        Close: 167.45,
        High: 168.60,
        Low: 166.99,
        Volume: 32143672
    },
    {
        Open: 167.51,
        Close: 169.53,
        High: 169.53,
        Low: 167.33,
        Volume: 26718781
    },
    {
        Open: 169.75,
        Close: 171.03,
        High: 171.23,
        Low: 169.69,
        Volume: 28156368
    },
    {
        Open: 171.06,
        Close: 170.52,
        High: 171.37,
        Low: 169.75,
        Volume: 27970006
    },
    {
        Open: 169.03,
        Close: 168.23,
        High: 169.45,
        Low: 166.95,
        Volume: 42036193
    },
    {
        Open: 166.73,
        Close: 168.56,
        High: 168.59,
        Low: 166.57,
        Volume: 29020747
    },
    {
        Open: 169.14,
        Close: 168.40,
        High: 169.58,
        Low: 167.98,
        Volume: 20754101
    },
    {
        Open: 169.59,
        Close: 170.89,
        High: 171.14,
        Low: 169.33,
        Volume: 28482006
    },
    {
        Open: 171.62,
        Close: 171.01,
        High: 172.16,
        Low: 170.82,
        Volume: 25095771
    },
    {
        Open: 170.38,
        Close: 171.22,
        High: 171.83,
        Low: 169.83,
        Volume: 29355864
    },
    {
        Open: 172.51,
        Close: 171.94,
        High: 172.53,
        Low: 171.14,
        Volume: 31027112
    },
    {
        Open: 171.39,
        Close: 172.28,
        High: 172.80,
        Low: 171.38,
        Volume: 18531406
    },
    {
        Open: 172.43,
        Close: 172.25,
        High: 173.08,
        Low: 171.32,
        Volume: 31793574
    },
    {
        Open: 171.77,
        Close: 171.62,
        High: 172.26,
        Low: 170.71,
        Volume: 24065041
    },
    {
        Open: 171.98,
        Close: 172.89,
        High: 173.01,
        Low: 171.90,
        Volume: 26246225
    },
    {
        Open: 174.20,
        Close: 173.52,
        High: 174.66,
        Low: 173.40,
        Volume: 32113220
    },
    {
        Open: 173.04,
        Close: 173.70,
        High: 174.25,
        Low: 172.81,
        Volume: 21615360
    },
    {
        Open: 173.04,
        Close: 173.19,
        High: 173.81,
        Low: 172.70,
        Volume: 25085470
    },
    {
        Open: 174.41,
        Close: 174.39,
        High: 174.65,
        Low: 173.18,
        Volume: 31431156
    },
    {
        Open: 175.37,
        Close: 174.42,
        High: 175.79,
        Low: 172.47,
        Volume: 38063458
    },
    {
        Open: 174.52,
        Close: 174.55,
        High: 175.09,
        Low: 173.69,
        Volume: 21967246
    },
    {
        Open: 174.68,
        Close: 173.56,
        High: 174.75,
        Low: 173.28,
        Volume: 26803298
    },
    {
        Open: 173.09,
        Close: 171.43,
        High: 173.18,
        Low: 170.79,
        Volume: 38997382
    },
    {
        Open: 169.51,
        Close: 171.17,
        High: 171.26,
        Low: 169.34,
        Volume: 38201540
    },
    {
        Open: 171.86,
        Close: 174.73,
        High: 174.85,
        Low: 171.85,
        Volume: 29151730
    },
    {
        Open: 175.17,
        Close: 175.69,
        High: 176.14,
        Low: 174.77,
        Volume: 34023182
    },
    {
        Open: 176.60,
        Close: 177.01,
        High: 177.93,
        Low: 176.35,
        Volume: 42718358
    },
    {
        Open: 177.12,
        Close: 176.71,
        High: 177.34,
        Low: 176.66,
        Volume: 23463289
    },
    {
        Open: 177.43,
        Close: 178.35,
        High: 178.88,
        Low: 177.28,
        Volume: 38048483
    },
    {
        Open: 177.95,
        Close: 178.45,
        High: 178.99,
        Low: 177.59,
        Volume: 31991129
    },
    {
        Open: 179.16,
        Close: 179.05,
        High: 180.00,
        Low: 178.29,
        Volume: 36227501
    }
    ];

// functions

average = (Price, Length) => {
    if (x >= Length - 1) {
        let avg = 0;
        for (let i = x; i > x - Length; i--) {
            avg += (Price[i] / Length);
        }
        return avg;
    }
}

lowestLow = (Price, Length) => {
    let lwst = Price;
    if (x >= Length - 1) {
        for (let i = x; i > x - Length; i--) {
            if (data[i].Low <= Price && data[i].Low <= lwst) {
                lwst = data[i].Low;
            }

        }
    }
    return lwst;
}

highestHigh = (Price, Length) => {
    let hghst = Price;
    if (x >= Length - 1) {
        for (let i = x; i > x - Length; i--) {
            if (data[i].High >= Price && data[i].High >= hghst) {
                hghst = data[i].High;
            }

        }
    }
    return hghst;
}


for (x === 0; x <= data.length - 1; x++) {
    range[x] = data[x].High - data[x].Low;
    OCRange[x] = Math.abs(data[x].Open - data[x].Close);
    ThisBar = x;
    if (x <= 3) {
        Vq[x] = false;
        Pq[x] = false;
    }
    VCRWMALqq.push(["Momentum Array"]);
    VCRWMASqq.push(["Momentum Array"]);
    VCRWMASq.push(["Momentum Array"]);
    VCRWMALq.push(["Momentum Array"]);
    VCRWMASqB.push(["Momentum Array"]);
    VCRWMALqB.push(["Momentum Array"]);
    CWMAV1Lq.push(["CWMAV1Lq Array"]);
    CWMAP1Hq.push(["CWMAP1Hq Array"]);
    RVMOM1.push(["RVMOM1 Array"]);
    RVMOM2.push(["RVMOM2 Array"]);
    RPMOM1.push(["RPMOM1 Array"]);
    RPMOM2.push(["RPMOM2 Array"]);
    CWMAV1LqB.push(["CWMAV1LqB Array"]);
    CWMAP1HqB.push(["CWMAP1HqB Array"]);
    RVMOM1B.push(["RVMOM1B Array"]);
    RVMOM2B.push(["RVMOM2B Array"]);
    RPMOM1B.push(["RPMOM1B Array"]);
    RPMOM2B.push(["RPMOM2B Array"]);
    SigBarCWVLq.push(["SigBarCWVLq Array"]);
    SigBarCWPHq.push(["SigBarCWPHq Array"]);
    SigBarCWVLqB.push(["SigBarCWVLqB Array"]);
    SigBarCWPHqB.push(["SigBarCWPHqB Array"]);
    VMOM1.push(["VMOM1 Array"]);
    VMOM2.push(["VMOM2 Array"]);
    VMOM1B.push(["VMOM1B Array"]);
    VMOM2B.push(["VMOM2B Array"]);
    PMOM1.push(["PMOM1 Array"]);
    PMOM2.push(["PMOM2 Array"]);
    PMOM1B.push(["PMOM1B Array"]);
    PMOM2B.push(["PMOM2B Array"]);
    DontGoLongq.push(["DontGoLong Array"]);
    DontGoShortq.push(["DontGoShort Array"]);
    PVFilterLq.push(["PVFilterLq Array"]);
    PVFilterSq.push(["PVFilterSq Array"]);
    MOMComboL.push(["MOMComboL Array"]);
    MOMComboS.push(["MOMComboS Array"]);
    MPLq.push(["VStratLS Indicator Array"]);
    SigBarLq.push(["VStrat SigBarL Array"]);
    SigLq.push(["SigLq Array"]);
    Exit2Lq.push(["Exit2Lq Array"]);
    TExit2Lq.push(["TExit2Lq Array"]);
    CumProfitsLqq.push(["Cumulative Long Profits Array"]);
    CumProfitsSqq.push(["Cumulative Short Profits Array"]);


    // {Tallboy BlackBar}
    if (data[x].Close < data[x].Open && data[x].Open === data[x].High && data[x].Close === data[x].Low && range[x] > OneTick) {
        CandleWeight[x] = -1 * CWfactor;
    }

    //  {Extreme DeathBar}
    if (data[x].Close === data[x].Open && data[x].Open === data[x].Low && data[x].Close === data[x].Low && range[x] > OneTick) {
        CandleWeight[x] = (-1 * CWfactor);
    }

    // {Black Upthrust not matching close}
    if (data[x].Close < data[x].Open && data[x].Open <= .5 * (data[x].High - data[x].Low) + data[x].Low && data[x].Close < .5 * (data[x].High - data[x].Low) + data[x].Low && range[x] > OneTick) {
        CandleWeight[x] = (1 - ((data[x].Open - OCRange[x] / 2) - data[x].Low) / range[x]) * -1 * CWfactor;
    }

    // {Black Upthrust Matching Close}
    if (data[x].Close === data[x].Open && data[x].Close < .5 * (data[x].High - data[x].Low) + data[x].Low && data[x].Open < .5 * (data[x].High - data[x].Low) + data[x].Low && range[x] > OneTick && data[x].Close != data[x].Low && data[x].Open != data[x].Low) {
        CandleWeight[x] = (1 - (data[x].Open - data[x].Low) / (data[x].High - data[x].Low)) * -1 * CWfactor;
    }

    // {Fat Black Hammer}
    if (data[x].Close < data[x].Open && data[x].Open > .5 * (data[x].High - data[x].Low) + data[x].Low && data[x].Close <= .5 * (data[x].High - data[x].Low) + data[x].Low && range[x] > OneTick) {
        CandleWeight[x] = (OCRange[x] / range[x] * -1) * CWfactor;
    }

    // {Black Hammer}
    if (data[x].Close < data[x].Open && data[x].Open > .5 * (data[x].High - data[x].Low) + data[x].Low && data[x].Close > .5 * (data[x].High - data[x].Low) + data[x].Low && range[x] > OneTick) {
        CandleWeight[x] = (1 - (data[x].High - data[x].Close) / (data[x].High - data[x].Low)) * CWfactor;
    }

    // {One tick bar upthrust}
    if (data[x].Close === data[x].Open && data[x].Open === data[x].Close && data[x].Open === data[x].Low && data[x].Close === data[x].Low && range[x] === OneTick) {
        CandleWeight[x] = -Onetickfactor;
    }

    // {One tick black bar}
    if (data[x].Open === data[x].High && data[x].Close === data[x].Low && range[x] === OneTick) {
        CandleWeight[x] = -1 * Onetickfactor;
    }

    // {No range[x]/doji}
    if ((data[x].Close === data[x].Open && data[x].Open === data[x].Close && data[x].Close === (data[x].High + data[x].Low) / 2 && data[x].Open === (data[x].High + data[x].Low) / 2 && range[x] > 0) || (range[x] === 0)) {
        CandleWeight[x] = 0;
    }

    //  {TallBoy WhiteBar}
    if (data[x].Close > data[x].Open && data[x].Open === data[x].Low && data[x].Close === data[x].High && range[x] > OneTick) {
        CandleWeight[x] = 1 * CWfactor;
    }

    // {Extreme Hammer}
    if (data[x].Close === data[x].Open && data[x].Open === data[x].High && data[x].Close === data[x].High && range[x] > OneTick) {
        CandleWeight[x] = 1 * CWfactor;
    }

    // {White Hammer}
    if (data[x].Close >= data[x].Open && data[x].Open >= .5 * (data[x].High - data[x].Low) + data[x].Low && data[x].Close >= .5 * (data[x].High - data[x].Low) + data[x].Low && range[x] > OneTick && data[x].Open != data[x].Close) {
        CandleWeight[x] = ((OCRange[x] / 2 + data[x].Open) - data[x].Low) / range[x] * CWfactor;
    }

    // {White Hammer Matching Close}
    if (data[x].Close === data[x].Open && data[x].Close > .5 * (data[x].High - data[x].Low) + data[x].Low && data[x].Open > .5 * (data[x].High - data[x].Low) + data[x].Low && range[x] > OneTick && data[x].Close != data[x].High && data[x].Open != data[x].High) {
        CandleWeight[x] = (1 - (data[x].High - data[x].Open) / (data[x].High - data[x].Low)) * CWfactor;
    }

    // {Fat White Hammer}
    if (data[x].Close > data[x].Open && data[x].Open <= .5 * (data[x].High - data[x].Low) + data[x].Low && data[x].Close >= .5 * (data[x].High - data[x].Low) + data[x].Low && range[x] > OneTick) {
        CandleWeight[x] = OCRange[x] / range[x] * CWfactor;
    }

    // {White Upthrust}
    if (data[x].Close > data[x].Open && data[x].Open < .5 * (data[x].High - data[x].Low) + data[x].Low && data[x].Close < .5 * (data[x].High - data[x].Low) + data[x].Low && range[x] > OneTick) {
        CandleWeight[x] = (1 - (data[x].Close - data[x].Low) / range[x]) * -1 * CWfactor;
    }

    // {One tick bar hammer}
    if (data[x].Close === data[x].Open && data[x].Open === data[x].High && data[x].Close === data[x].High && range[x] === OneTick) {
        CandleWeight[x] = Onetickfactor;
    }

    // {One tick white bar}
    if (data[x].Open === data[x].Low && data[x].Close === data[x].High && range[x] === OneTick) {
        CandleWeight[x] = Onetickfactor;
    }



    // if (moment().format()  > TooLate || moment().format()  < TooEarly) {
    //     DontTradeToday = true 
    // } else { DontTradeToday = false }
    // if (moment().format()  > TooLateEntry || moment().format()  < TooEarly) {
    //     DontRTradeToday = true
    // } else { DontRTradeToday = false }


    //  if (moment().format('L') != moment().format('L')[1]) { DailyBarCounter = 0; }

    //  if (moment().format('L') != moment().format('L')[1] && DailyBarCounter[1] > MinDailyBars) {
    //     VMindays = true; }

    //  if (VMindays && moment().format('L') != moment().format('L')[1] && DailyBarCounter[1] > MinDailyBars) {
    //     VMindaysCtr++; }


    if (x > LookBackDays) {
        Mindays = true;
    }


    // // /// MP = MarketPosition;
    BarCenter[x] = (range[x] / 2) + data[x].Low;
    StopLossConversion = StopLoss / DollarsPerPt;
    Stretch[x] = (data[x].High - BarCenter[x + 1]) + (data[x].Low - BarCenter[x + 1]);
    SCW[x] = Stretch[x] + (CandleWeight[x] * range[x]);

    if (MomentumType === 1) {
        VCRWeight[x] = (1 / CandleWeight[x]);
    }
    if (MomentumType === 1.25) {
        VCRWeight[x] = (range[x] / CandleWeight[x]);
    }
    if (MomentumType === 1.5) {
        VCRWeight[x] = ((CandleWeight[x] * range[x]) / data[x].Volume);
    }
    if (MomentumType === 1.75) {
        VCRWeight[x] = (data[x].Volume / (CandleWeight[x] * range[x]));
    }
    if (MomentumType === 2) {
        VCRWeight[x] = (CandleWeight[x]);
    }
    if (MomentumType === 2.25) {
        VCRWeight[x] = (CandleWeight[x] * range[x]);
    }
    if (MomentumType === 2.5) {
        VCRWeight[x] = (CandleWeight[x] * data[x].Volume);
    }
    if (MomentumType === 2.75) {
        VCRWeight[x] = (CandleWeight[x] * range[x] * data[x].Volume);
    }


    if (MSTRMOMSELECT === 0) {
        if (MSTRMAVDIST === 1) {
            for (let i = 1; i <= MVSZ / 5; i++) {
                MAVGq[i] = Math.round(MAVG * (i + MAVGConfig - 1) / MAVGConfig);
            }
            for (let i = (MVGSZ / 5) + 1; i <= 2 * MVGSZ / 5; i++) {
                MAVGq[i] = Math.round(MAVG * (i - 1 * 5 + MAVGConfig - 1) / MAVGConfig);
            }
            for (let i = 2 * (MVGSZ / 5) + 1; i <= 3 * MVGSZ / 5; i++) {
                MAVGq[i] = Math.round(MAVG * (i - 2 * 5 + MAVGConfig - 1) / MAVGConfig);
            }
            for (let i = 3 * (MVGSZ / 5) + 1; i <= 4 * MVGSZ / 5; i++) {
                MAVGq[i] = Math.round(MAVG * (i - 3 * 5 + MAVGConfig - 1) / MAVGConfig);
            }
            for (let i = 4 * (MVGSZ / 5) + 1; i <= 5 * MVGSZ / 5; i++) {
                MAVGq[i] = Math.round(MAVG * (i - 4 * 5 + MAVGConfig - 1) / MAVGConfig);
            };
        }

        for (let i = 1; i <= MVGSZ / 5; i++) {
            if (MAVGq[i] >= MAXBARS - 1) { MAVGq[i] = MAXBARS - 1; }
        }
        for (let i = 1 * MVGSZ / 5 + 1; i <= 2 * MVGSZ / 5; i++) {
            if (MAVGq[i] >= MAXBARS - 1) { MAVGq[i] = MAXBARS - 1; }
        }
        for (let i = 2 * MVGSZ / 5 + 1; i <= 3 * MVGSZ / 5; i++) {
            if (MAVGq[i] >= MAXBARS - 1) { MAVGq[i] = MAXBARS - 1; }
        }
        for (let i = 3 * MVGSZ / 5 + 1; i <= 4 * MVGSZ / 5; i++) {
            if (MAVGq[i] >= MAXBARS - 1) { MAVGq[i] = MAXBARS - 1; }
        }
        for (let i = 4 * MVGSZ / 5 + 1; i <= 5 * MVGSZ / 5; i++) {
            if (MAVGq[i] >= MAXBARS - 1) { MAVGq[i] = MAXBARS - 1; }
        }


        if (MSTRMAVDIST === 2) {
            for (let i = SETNUMS; i > 0; i--) {
                MAVGq[MVGSZ - (i * SETNUMS) + 1] = MAVG;
            }
            for (let i = SETNUMS; i > 0; i--) {
                MAVGq[MVGSZ - (i * SETNUMS) + 2] = Math.round(MAVGq[MVGSZ - (i * SETNUMS) + 1] * MAVGConfig);
            }
            for (let i = SETNUMS; i > 0; i--) {
                MAVGq[MVGSZ - (i * SETNUMS) + 3] = Math.round(MAVGq[MVGSZ - (i * SETNUMS) + 2] * MAVGConfig);
            }
            for (let i = SETNUMS; i > 0; i--) {
                MAVGq[MVGSZ - (i * SETNUMS) + 4] = Math.round(MAVGq[MVGSZ - (i * SETNUMS) + 3] * MAVGConfig);
            }
            for (let i = SETNUMS; i > 0; i--)
                MAVGq[MVGSZ - (i * SETNUMS) + 5] = Math.round(MAVGq[MVGSZ - (i * SETNUMS) + 4] * MAVGConfig);
        }

    }
    for (let i = 1; i <= MVGSZ / 5; i++) {
        if (MAVGq[i] >= MAXBARS - 1) { MAVGq[i] = MAXBARS - 1; }
    }
    for (let i = 1 * MVGSZ / 5 + 1; i <= 2 * MVGSZ / 5; i++) {
        if (MAVGq[i] >= MAXBARS - 1) { MAVGq[i] = MAXBARS - 1; }
    }
    for (let i = 2 * MVGSZ / 5 + 1; i <= 3 * MVGSZ / 5; i++) {
        if (MAVGq[i] >= MAXBARS - 1) { MAVGq[i] = MAXBARS - 1; }
    }
    for (let i = 3 * MVGSZ / 5 + 1; i <= 4 * MVGSZ / 5; i++) {
        if (MAVGq[i] >= MAXBARS - 1) { MAVGq[i] = MAXBARS - 1; }
    }
    for (let i = 4 * MVGSZ / 5 + 1; i <= 5 * MVGSZ / 5; i++) {
        if (MAVGq[i] >= MAXBARS - 1) { MAVGq[i] = MAXBARS - 1; }
    }

    if (MSTRMOMSELECT > 0) {
        if (MSTRMAVDIST === 1) {
            for (let i = 1; i <= MVGSZ; i++) {
                MAVGq[i] = Math.round(MAVG * (i + MAVGConfig - 1) / MAVGConfig);
            }
            for (let i = 1; i <= MVGSZ; i++) {
                if (MAVGq[i] >= MAXBARS - 1) { MAVGq[i] = MAXBARS - 1; }
            }
        }


        if (MSTRMAVDIST === 2) {
            MAVGq[1] = MAVG;
            for (let i = 2; i <= MVGSZ; i++) {
                MAVGq[i] = MAVGq[i - 1] * MAVGConfig;
            }
        }

        for (let i = 1; i <= MVGSZ; i++) {
            if (MAVGq[i] >= MAXBARS - 1) { MAVGq[i] = MAXBARS - 1; }
        }
    }

    if (CenterType === 0) {
        CWCenter[x] = (range[x] / 2 + data[x].Low) + (CandleWeight[x] * range[x] / 2);
    }

    CXMA[x] = average(CWCenter, CenterMA);
    XMA13[x] = average(CWCenter, CenterMA);
    Rang20[x] = average(range, CenterMA) * RangeAvg;
    TRang20[x] = average(range, CenterMA) * TRangeAvg;
    TX2Rang20[x] = average(range, CenterMA) * T2RangeAvg;
    XDRang20[x] = average(range, CenterMA) * SafetyRangeAvg;
    HiBand20[x] = average(CWCenter, CenterMA) + Rang20[x];
    LoBand20[x] = average(CWCenter, CenterMA) - Rang20[x];
    THiBand20[x] = average(CWCenter, CenterMA) + TRang20[x];
    TLoBand20[x] = average(CWCenter, CenterMA) - TRang20[x];
    TX2HiBand20[x] = average(CWCenter, CenterMA) + TX2Rang20[x];
    TX2LoBand20[x] = average(CWCenter, CenterMA) - TX2Rang20[x];
    XDHiBand[x] = average(CWCenter, CenterMA) + XDRang20[x];
    XDLoBand[x] = average(CWCenter, CenterMA) - XDRang20[x];






    if (x > 3) {
        if (data[x - 2].Low <= lowestLow(data[x - 2].Low, MSTRSwingHL) && data[x].Low > data[x - 2].Low && data[x - 1].Low > data[x - 2].Low && data[x - 2].Low < CXMA[x - 2]
            && data[x - 2].High != highestHigh(data[x - 2].High, MSTRSwingHL)) {
            SLROVq[x] = (Math.max(data[x].High, data[x - 1].High, data[x - 2].High, data[x - 3].High, data[x - 4].High) - Math.min(data[x].Low, data[x - 1].Low, data[x - 2].Low, data[x - 3].Low, data[x - 4].Low)) /
                (data[x].Volume + data[x - 1].Volume + data[x - 2].Volume + data[x - 3].Volume + data[x - 4].Volume);
            // SHLROVBq[x] = SHLROVq[x - 2];
            // SLLROVBq[x] = SLROVq[x - 2];
        } else {
            SLROVq[x] = SLROVq[x - 1];
        }

        if (data[x - 2].High >= highestHigh(data[x - 2].High, MSTRSwingHL) && data[x].High < data[x - 2].High && data[x - 1].High < data[x - 2].High && data[x - 2].High > CXMA[x - 2]
            && data[x - 2].Low != lowestLow(data[x - 2].Low, MSTRSwingHL)) {
            SHROVq[x] = (Math.max(data[x].High, data[x - 1].High, data[x - 2].High, data[x - 3].High, data[x - 4].High) - Math.min(data[x].Low, data[x - 1].Low, data[x - 2].Low, data[x - 3].Low, data[x - 4].Low)) /
                (data[x].Volume + data[x - 1].Volume + data[x - 2].Volume + data[x - 3].Volume + data[x - 4].Volume);
            // SHLROVBq[x] = SHLROVq[x - 2];
            // SHHROVBq[x] = SHROVq[x - 2];
        } else {
            SHROVq[x] = SHROVq[x - 1];
        }

        if (SLROVq[x] != SLROVq[x - 1]) {
            SHLROVq[x] = SLROVq[x];
        }
        else if (SHROVq[x] != SHROVq[x - 1]) {
            SHLROVq[x] = SHROVq[x];
        }
        else {
            SHLROVq[x] = SHLROVq[x - 1];
        }


        if (MSTRMOMSELECT === 0) {

            for (let i = 1; i <= MVGSZ / 5; i++) {
                MAVGVq[i] = MAVGq[i];
                MAVGPq[i] = MAVGq[i];
            }


            for (let i = (MVGSZ / 5) + 1; i <= 2 * (MVGSZ / 5); i++) {
                SigBarPVq[x] = SigBarPVq[x - 1];
                if (data[x - 2].Low <= lowestLow(data[x - 2].Low, MAVGq[i]) && data[x].Low > data[x - 2].Low && data[x - 1].Low > data[x - 2].Low
                    && data[x - 2].High != highestHigh(data[x - 2].High, MAVGq[i])) {
                    SigBarPVq[x] = x - 2;
                    MAVGPq[i] =
                        (SigBarPVq[x] -
                            SigBarVPq[x]);
                }
                SigBarVPq[x] = SigBarVPq[x - 1];
                if (data[x - 2].High >= highestHigh(data[x - 2].High, MAVGq[i]) && data[x].High < data[x - 2].High && data[x - 1].High < data[x - 2].High
                    && data[x - 2].Low != lowestLow(data[x - 2].Low, MAVGq[i])) {
                    SigBarVPq[x] = x - 2;
                    MAVGVq[i] =
                        (SigBarVPq[x] -
                            SigBarPVq[x]);
                }
            }

            for (let i = 2 * (MVGSZ / 5) + 1; i <= 3 * (MVGSZ / 5); i++) {
                SigBarVq[x] = SigBarVq[x - 1];
                if (data[x - 2].Low <= lowestLow(data[x - 2].Low, MAVGq[i]) && data[x].Low > data[x - 2].Low && data[x - 1].Low > data[x - 2].Low
                    && data[x - 2].High != highestHigh(data[x - 2].High, MAVGq[i])) {
                    SigBarVq[x] = x - 2;
                    MAVGPq[i] =
                        (SigBarVq[x] -
                            SigBarVq[x - 2]);
                }
                SigBarPq[x] = SigBarPq[x - 1];
                if (data[x - 2].High >= highestHigh(data[x - 2].High, MAVGq[i]) && data[x].High < data[x - 2].High && data[x - 1].High < data[x - 2].High
                    && data[x - 2].Low != lowestLow(data[x - 2].Low, MAVGq[i])) {
                    SigBarPq[x] = x - 2;
                    MAVGVq[i] =
                        (SigBarPq[x] -
                            SigBarPq[x - 2]);
                }
            }

            for (let i = 3 * (MVGSZ / 5) + 1; i <= 4 * (MVGSZ / 5); i++) {
                Vq[x] = Vq[x - 1];
                Pq[x] = Pq[x - 1];
                SigBarVqp[x] = SigBarVqp[x - 1];
                if (data[x - 2].Low <= lowestLow(data[x - 2].Low, MAVGq[i]) && data[x].Low > data[x - 2].Low && data[x - 1].Low > data[x - 2].Low
                    && data[x - 2].High != highestHigh(data[x - 2].High, MAVGq[i]) &&
                    Vq[x] === false) {
                    SigBarVqp[x] = x - 2;
                    MAVGPq[i] =
                        (SigBarVqp[x] -
                            SigBarVqp[x - 2]);
                    Vq[x] = true;
                    Pq[x] = false;
                }

                SigBarPqp[x] = SigBarPqp[x - 1];
                if (data[x - 2].High >= highestHigh(data[x - 2].High, MAVGq[i]) && data[x].High < data[x - 2].High && data[x - 1].High < data[x - 2].High
                    && data[x - 2].Low != lowestLow(data[x - 2].Low, MAVGq[i]) &&
                    Pq[x] === false) {
                    SigBarPqp[x] = x - 2;
                    MAVGVq[i] =
                        (SigBarPqp[x] -
                            SigBarPqp[x - 2]);
                    Pq[x] = true;
                    Vq[x] = false;
                }
            }

            for (i = 4 * (MVGSZ / 5) + 1; i <= 5 * (MVGSZ / 5); i++) {
                SigBarPVqp[x] = SigBarPVqp[x - 1];
                SigBarVPqp[x] = SigBarVPqp[x - 1];
                SigBarPV2q[x] = SigBarPV2q[x - 1];
                SigBarVP2q[x] = SigBarVP2q[x - 1];
                if (data[x - 2].Low <= lowestLow(data[x - 2].Low, MAVGq[i]) && data[x].Low > data[x - 2].Low && data[x - 1].Low > data[x - 2].Low
                    && data[x - 2].High != highestHigh(data[x - 2].High, MAVGq[i])) {
                    SigBarPVqp[x] = x - 2;
                    SigBarPV2q[x] = x - 2 -
                        ((SigBarPVqp[x] -
                            SigBarVPqp[x]) / Factor4);
                }

                if (data[x - 2].High >= highestHigh(data[x - 2].High, MAVGq[i]) && data[x].High < data[x - 2].High && data[x - 1].High < data[x - 2].High
                    && data[x - 2].Low != lowestLow(data[x - 2].Low, MAVGq[i])) {
                    SigBarVPqp[x] = x - 2;
                    SigBarVP2q[x] = x - 2 -
                        ((SigBarVPqp[x] -
                            SigBarPVqp[x]) / Factor4);
                }

                MAVGVq[i] = Math.round(x - SigBarVP2q[x]);
                MAVGPq[i] = Math.round(x - SigBarPV2q[x]);
            }
        }

        if (MSTRMOMSELECT === 1) {
            for (let i = 1; i <= MVGSZ; i++) {
                MAVGVq[i] = MAVGq[i];
                MAVGPq[i] = MAVGq[i];
            }
        }

        if (MSTRMOMSELECT === 2) {
            for (let i = 1; i <= MVGSZ; i++) {
                SigBarPVq[x] = SigBarPVq[x - 1];
                if (data[x - 2].Low <= lowestLow(data[x - 2].Low, MAVGq[i]) && data[x].Low > data[x - 2].Low && data[x - 1].Low > data[x - 2].Low
                    && data[x - 2].High != highestHigh(data[x - 2].High, MAVGq[i])) {
                    SigBarPVq[x] = x - 2;
                    MAVGPq[i] =
                        (SigBarPVq[x] -
                            SigBarVPq[x]);
                }
                SigBarVPq[x] = SigBarVPq[x - 1];
                if (data[x - 2].High >= highestHigh(data[x - 2].High, MAVGq[i]) && data[x].High < data[x - 2].High && data[x - 1].High < data[x - 2].High
                    && data[x - 2].Low != lowestLow(data[x - 2].Low, MAVGq[i])) {
                    SigBarVPq[x] = x - 2;
                    MAVGVq[i] =
                        (SigBarVPq[x] -
                            SigBarPVq[x]);
                }
            }
        }

        if (MSTRMOMSELECT === 3) {
            for (let i = 0; i <= MVGSZ; i++) {
                SigBarVq[x] = SigBarVq[x - 1];
                if (data[x - 2].Low <= lowestLow(data[x - 2].Low, MAVGq[i]) && data[x].Low > data[x - 2].Low && data[x - 1].Low > data[x - 2].Low
                    && data[x - 2].High != highestHigh(data[x - 2].High, MAVGq[i])) {
                    SigBarVq[x] = x - 2;
                    MAVGPq[i] =
                        (SigBarVq[x] -
                            SigBarVq[x - 2]);
                }
                SigBarPq[x] = SigBarPq[x - 1];
                if (data[x - 2].High >= highestHigh(data[x - 2].High, MAVGq[i]) && data[x].High < data[x - 2].High && data[x - 1].High < data[x - 2].High
                    && data[x - 2].Low != lowestLow(data[x - 2].Low, MAVGq[i])) {
                    SigBarPq[x] = x - 2;
                    MAVGVq[i] =
                        (SigBarPq[x] -
                            SigBarPq[x - 2]);
                }
            }
        }

        if (MSTRMOMSELECT === 4) {
            for (let i = 0; i <= MVGSZ; i++) {
                Vq[x] = Vq[x - 1];
                Pq[x] = Pq[x - 1];
                SigBarVqp[x] = SigBarVqp[x - 1];
                if (data[x - 2].Low <= lowestLow(data[x - 2].Low, MAVGq[i]) && data[x].Low > data[x - 2].Low && data[x - 1].Low > data[x - 2].Low
                    && data[x - 2].High != highestHigh(data[x - 2].High, MAVGq[i]) &&
                    Vq[x] === false) {
                    SigBarVqp[x] = x - 2;
                    MAVGPq[i] =
                        (SigBarVqp[x] -
                            SigBarVqp[x - 2]);
                    Vq[x] = true;
                    Pq[x] = false;
                }

                SigBarPqp[x] = SigBarPqp[x - 1];
                if (data[x - 2].High >= highestHigh(data[x - 2].High, MAVGq[i]) && data[x].High < data[x - 2].High && data[x - 1].High < data[x - 2].High
                    && data[x - 2].Low != lowestLow(data[x - 2].Low, MAVGq[i]) &&
                    Pq[x] === false) {
                    SigBarPqp[x] = x - 2;
                    MAVGVq[i] =
                        (SigBarPqp[x] -
                            SigBarPqp[x - 2]);
                    Pq[x] = true;
                    Vq[x] = false;
                }
            }
        }

        if (MSTRMOMSELECT === 5) {
            for (let i = 0; i <= MVGSZ; i++) {
                SigBarPVqp[x] = SigBarPVqp[x - 1];
                SigBarVPqp[x] = SigBarVPqp[x - 1];
                SigBarPV2q[x] = SigBarPV2q[x - 1];
                SigBarVP2q[x] = SigBarVP2q[x - 1];
                if (data[x - 2].Low <= lowestLow(data[x - 2].Low, MAVGq[i]) && data[x].Low > data[x - 2].Low && data[x - 1].Low > data[x - 2].Low
                    && data[x - 2].High != highestHigh(data[x - 2].High, MAVGq[i])) {
                    SigBarPVqp[x] = x - 2;
                    SigBarPV2q[x] = x - 2 -
                        ((SigBarPVqp[x] -
                            SigBarVPqp[x]) / Factor4);
                }

                if (data[x - 2].High >= highestHigh(data[x - 2].High, MAVGq[i]) && data[x].High < data[x - 2].High && data[x - 1].High < data[x - 2].High
                    && data[x - 2].Low != lowestLow(data[x - 2].Low, MAVGq[i])) {
                    SigBarVPqp[x] = x - 2;
                    SigBarVP2q[x] = x - 2 -
                        ((SigBarVPqp[x] -
                            SigBarPVqp[x]) / Factor4);
                }

                MAVGVq[i] = Math.round(x - SigBarVP2q[x]);
                MAVGPq[i] = Math.round(x - SigBarPV2q[x]);
            }
        }

        for (i = 0; i <= MVGSZ; i++) {
            if (MAVGVq[x] >= MAXBARS - 1) { MAVGVq[x] = MAXBARS - 1; }
            if (MAVGPq[x] >= MAXBARS - 1) { MAVGPq[x] = MAXBARS - 1; }
        }

        // For X=1 to MVGSZ begin
        // If MAVGV#[X]<=3 then begin MAVGV#[X]=3; end;
        // If MAVGP#[X]<=3 then begin MAVGP#[X]=3; end;
        // end;

        // For X=1 to MVGSZ begin
        // For Z=1 to SMSZ begin
        // MAVGV#Mult[X+MVGSZ*(Z-1)]=Round(MAVGV#[X]*SMCLG*Z/SMSZ,0);
        // MAVGP#Mult[X+MVGSZ*(Z-1)]=Round(MAVGP#[X]*SMCLG*Z/SMSZ,0);
        // end;                                
        // end;



        // For X=1 to Size begin
        // If MAVGV#Mult[X]<1 then MAVGV#Mult[X]=1 else MAVGV#Mult[X]=MAVGV#Mult[X];
        // If MAVGP#Mult[X]<1 then MAVGP#Mult[X]=1 else MAVGP#Mult[X]=MAVGP#Mult[X];
        // end;





        if (PVSwitch === 0) {
            for (let j = 1; j <= MVGSZ; j++) {
                if (x > MAVGVq[j]) {
                    VCRWMALqq[x].push(average(VCRWeight, MAVGVq[j]).toPrecision(10));
                }
                if (x > MAVGPq[j]) {
                    VCRWMASqq[x].push(average(VCRWeight, MAVGPq[j]).toPrecision(10));
                }
            }
        }
        if (PVSwitch === 1) {
            for (let j = 1; j <= MVGSZ; j++) {
                if (x > MAVGVq[j]) {
                    VCRWMASqq[x].push(average(VCRWeight, MAVGVq[j]).toPrecision(10));
                }
                if (x > MAVGPq[j]) {
                    VCRWMALqq[x].push(average(VCRWeight, MAVGPq[j]).toPrecision(10));
                }
            }
        }



        for (let j = 1; j <= MVGSZ; j++) {
            if (MomentumFlip === 0) {
                VCRWMALq[x][j] = VCRWMALqq[x][j];
                VCRWMASq[x][j] = VCRWMASqq[x][j];
                VCRWMASqB[x][j] = VCRWMASqq[x - 1][j] - VCRWMASqq[x][j];
                VCRWMALqB[x][j] = VCRWMALqq[x - 1][j] - VCRWMALqq[x][j];
            }


            if (MomentumFlip === 1) {
                VCRWMALq[x][j] = -1 * VCRWMALqq[x][j];
                VCRWMASq[x][j] = -1 * VCRWMASqq[x][j];
                VCRWMASqB[x][j] = VCRWMASqq[x][j] - VCRWMASqq[x - 1][j];
                VCRWMALqB[x][j] = VCRWMALqq[x][j] - VCRWMALqq[x - 1][j];
            }
        }

        SigBarVL[x] = SigBarVL[x - 1];
        SigBarVL2q[x] = SigBarVL2q[x - 1];
        SigBarPH[x] = SigBarPH[x - 1];
        SigBarPH2q[x] = SigBarPH2q[x - 1];
        SigBarCWPHq[x] = SigBarCWPHq[x - 1];
        SigBarCWPHqB[x] = SigBarCWPHqB[x - 1];
        SigBarCWVLq[x] = SigBarCWVLq[x - 1];
        SigBarCWVLqB[x] = SigBarCWVLqB[x - 1];
        V1L[x] = V1L[x - 1];
        P1H[x] = P1H[x - 1];
        VNum[x] = VNum[x - 1];
        PNum[x] = PNum[x - 1];
        Valley1[x] = Valley1[x - 1];
        Peak1[x] = Peak1[x - 1];
        MOVEUP[x] = MOVEUP[x - 1];
        MOVEDN[x] = MOVEDN[x - 1];

        if (MOMSPOT === 1) {
            if (SWINGSETUP === 1) {
                if (SHLType === 1) {
                    if (data[x - 2].Low <= lowestLow(data[x - 2].Low, MSTRSwingHL) && data[x].Low > data[x - 2].Low && data[x - 1].Low > data[x - 2].Low && data[x - 2].Low < CXMA[x - 2]
                        && data[x - 2].High != highestHigh(data[x - 2].High, MSTRSwingHL)) {
                        SigBarVL[x] = x - 2;
                        SigBarVL2q[x] = x - 2;
                        SigBarPH[x] = 0;
                        V1L[x] = data[x - 2].Low;
                        VNum[x] = VNum[x] + 1;
                        PNum[x] = 0;
                        Valley1[x] = true;
                        Peak1[x] = false;

                        // for (let z = 1; z <= Agree; z++) {
                        //     CWMAV1Lq[x][z] = RVCRWMALq[x - CWHLLB][z];
                        //     RVMOM1[x][z] = RVCRWMALq[x - CWHLLB][z];
                        //     RVMOM2[x][z] = RVMOM1[x - CWHLLB][z];
                        //     RPMOM1[x][z] = 0;
                        //     RPMOM2[x][z] = 0;
                        //     CWMAV1LqB[x][z] = RVCRWMALqB[x - CWHLLB][z];
                        //     RVMOM1B[x][z] = RVCRWMALqB[x - CWHLLB][z];
                        //     RVMOM2B[x][z] = RVMOM1B[x - CWHLLB][z];
                        //     RPMOM1B[x][z] = 0;
                        //     RPMOM2B[x][z] = 0;
                        // }

                        for (let j = 1; j <= Size; j++) {
                            SigBarCWVLq[x][j] = VCRWMALq[x - CWHLLB][j];
                            SigBarCWVLqB[x][j] = VCRWMALqB[x - CWHLLB][j];
                            VMOM1[x][j] = VCRWMALq[x - CWHLLB][j];
                            VMOM2[x][j] = VMOM1[x - CWHLLB][j];
                            VMOM1B[x][j] = VCRWMALqB[x - CWHLLB][j];
                            VMOM2B[x][j] = VMOM1B[x - CWHLLB][j];
                            PMOM1[x][j] = 0;
                            PMOM2[x][j] = 0;
                            PMOM1B[x][j] = 0;
                            PMOM2B[x][j] = 0;
                        }
                    }

                    if (data[x - 2].High >= highestHigh(data[x - 2].High, MSTRSwingHL) && data[x].High < data[x - 2].High && data[x - 1].High < data[x - 2].High && data[x - 2].High > CXMA[x - 2]
                        && data[x - 2].Low != lowestLow(data[x - 2].Low, MSTRSwingHL)) {
                        SigBarPH[x] = x - 2;
                        SigBarPH2q[x] = x - 2;
                        SigBarVL[x] = 0;
                        P1H[x] = data[x - 2].High;
                        PNum[x] = PNum[x] + 1;
                        VNum[x] = 0;
                        Peak1[x] = true;
                        Valley1[x] = false;

                        // for (let z = 1; z <= Agree; z++) {
                        //     CWMAP1Hq[x][z] = RVCRWMASq[x - CWHLLB][z];
                        //     RPMOM1[x][z] = RVCRWMASq[x - CWHLLB][z];
                        //     RPMOM2[x][z] = RPMOM1[x - CWHLLB][z];
                        //     RVMOM1[x][z] = 0;
                        //     RVMOM2[x][z] = 0;
                        //     CWMAP1HqB[x][z] = RVCRWMASqB[x - CWHLLB][z];
                        //     RPMOM1B[x][z] = RVCRWMASqB[x - CWHLLB][z];
                        //     RPMOM2B[x][z] = RPMOM1B[x - CWHLLB][z];
                        //     RVMOM1B[x][z] = 0;
                        //     RVMOM2B[x][z] = 0;
                        // }

                        for (let j = 1; j <= Size; j++) {
                            SigBarCWPHq[x][j] = VCRWMASq[x - CWHLLB][j];
                            SigBarCWPHqB[x][j] = VCRWMASqB[x - CWHLLB][j];
                            PMOM1[x][j] = VCRWMASq[x - CWHLLB][j];
                            PMOM2[x][j] = PMOM1[x - CWHLLB][j];
                            VMOM1[x][j] = 0;
                            VMOM2[x][j] = 0;
                            PMOM1B[x][j] = VCRWMASqB[x - CWHLLB][j];
                            PMOM2B[x][j] = PMOM1B[x - CWHLLB][j];
                            VMOM1B[x][j] = 0;
                            VMOM2B[x][j] = 0;
                        }
                    }
                }
            }


            if (SWINGSETUP === 2) {
                if (SHLType === 1) {
                    if (data[x - 2].Low <= lowestLow(data[x - 2].Low, MSTRSwingHL) && data[x].Low > data[x - 2].Low && data[x - 1].Low > data[x - 2].Low && data[x - 2].Low < CXMA[x - 2]
                        && data[x - 2].High != highestHigh(data[x - 2].High, MSTRSwingHL)) {
                        SigBarVL[x] = x - 2;
                        SigBarVL2q[x] = x - 2;
                        SigBarPH[x] = 0;
                        V1L[x] = data[x - 2].Low;
                        VNum[x] = VNum[x] + 1;
                        PNum[x] = 0;
                        Valley1[x] = true;
                        Peak1[x] = false;

                        // for (let z = 1; z <= Agree; z++) {
                        //     CWMAV1Lq[x][z] = RVMOM1[x - CWHLLB][z];
                        //     RVMOM1[x][z] = RVCRWMALq[x - CWHLLB][z];
                        //     RVMOM2[x][z] = RVMOM1[x - CWHLLB][z];
                        //     RPMOM1[x][z] = 0;
                        //     RPMOM2[x][z] = 0;
                        //     CWMAV1LqB[x][z] = RVMOM1B[x - CWHLLB][z];
                        //     RVMOM1B[x][z] = RVCRWMALqB[x - CWHLLB][z];
                        //     RVMOM2B[x][z] = RVMOM1B[x - CWHLLB][z];
                        //     RPMOM1B[x][z] = 0;
                        //     RPMOM2B[x][z] = 0;
                        // }

                        for (let j = 1; j <= Size; j++) {
                            SigBarCWVLq[x][j] = VMOM1[x - CWHLLB][j];
                            SigBarCWVLqB[x][j] = VMOM1B[x - CWHLLB][j];
                            VMOM1[x][j] = VCRWMALq[x - CWHLLB][j];
                            VMOM2[x][j] = VMOM1[x - CWHLLB][j];
                            VMOM1B[x][j] = VCRWMALqB[x - CWHLLB][j];
                            VMOM2B[x][j] = VMOM1B[x - CWHLLB][j];
                            PMOM1[x][j] = 0;
                            PMOM2[x][j] = 0;
                            PMOM1B[x][j] = 0;
                            PMOM2B[x][j] = 0;
                        }
                    }

                    if (data[x - 2].High >= highestHigh(data[x - 2].High, MSTRSwingHL) && data[x].High < data[x - 2].High && data[x - 1].High < data[x - 2].High && data[x - 2].High > CXMA[x - 2]
                        && data[x - 2].Low != lowestLow(data[x - 2].Low, MSTRSwingHL)) {
                        SigBarPH[x] = x - 2;
                        SigBarPH2q[x] = x - 2;
                        SigBarVL[x] = 0;
                        P1H[x] = data[x - 2].High;
                        PNum[x] = PNum[x] + 1;
                        VNum[x] = 0;
                        Peak1[x] = true;
                        Valley1[x] = false;

                        // for (let z = 1; z <= Agree; z++) {
                        //     CWMAP1Hq[x][z] = RPMOM1[x - CWHLLB][z];
                        //     RPMOM1[x][z] = RVCRWMASq[x - CWHLLB][z];
                        //     RPMOM2[x][z] = RPMOM1[x - CWHLLB][z];
                        //     RVMOM1[x][z] = 0;
                        //     RVMOM2[x][z] = 0;
                        //     CWMAP1HqB[x][z] = RPMOM1B[x - CWHLLB][z];
                        //     RPMOM1B[x][z] = RVCRWMASqB[x - CWHLLB][z];
                        //     RPMOM2B[x][z] = RPMOM1B[x - CWHLLB][z];
                        //     RVMOM1B[x][z] = 0;
                        //     RVMOM2B[x][z] = 0;
                        // }

                        for (let j = 1; j <= Size; j++) {
                            SigBarCWPHq[x][j] = PMOM1[x - CWHLLB][j];
                            SigBarCWPHqB[x][j] = PMOM1B[x - CWHLLB][j];
                            PMOM1[x][j] = VCRWMASq[x - CWHLLB][j];
                            PMOM2[x][j] = PMOM1[x - CWHLLB][j];
                            VMOM1[x][j] = 0;
                            VMOM2[x][j] = 0;
                            PMOM1B[x][j] = VCRWMASqB[x - CWHLLB][j];
                            PMOM2B[x][j] = PMOM1B[x - CWHLLB][j];
                            VMOM1B[x][j] = 0;
                            VMOM2B[x][j] = 0;
                        }
                    }
                }
            }

            if (SWINGSETUP === 3) {
                if (SHLType === 1) {
                    if (data[x - 2].Low <= lowestLow(data[x - 2].Low, MSTRSwingHL) && data[x].Low > data[x - 2].Low && data[x - 1].Low > data[x - 2].Low && data[x - 2].Low < CXMA[x - 2]
                        && data[x - 2].High != highestHigh(data[x - 2].High, MSTRSwingHL)) {
                        SigBarVL[x] = x - 2;
                        SigBarVL2q[x] = x - 2;
                        SigBarPH[x] = 0;
                        V1L[x] = data[x - 2].Low;
                        VNum[x] = VNum[x] + 1;
                        PNum[x] = 0;
                        Valley1[x] = true;
                        Peak1[x] = false;

                        // for (let z = 1; z <= Agree; z++) {
                        //     CWMAV1Lq[x][z] = RVMOM1[x - CWHLLB][z];
                        //     RVMOM1[x][z] = RVCRWMALq[x - CWHLLB][z];
                        //     RVMOM2[x][z] = RVMOM1[x - CWHLLB][z];
                        //     //RPMOM1[Z]=0;
                        //     //RPMOM2[Z]=0;
                        //     CWMAV1LqB[x][z] = RVMOM1B[x - CWHLLB][z];
                        //     RVMOM1B[x][z] = RVCRWMALqB[x - CWHLLB][z];
                        //     RVMOM2B[x][z] = RVMOM1B[x - CWHLLB][z];
                        //     //RPMOM1B[Z]=0;
                        //     //RPMOM2B[Z]=0;
                        // }

                        for (let j = 1; j <= Size; j++) {
                            SigBarCWVLq[x][j] = VMOM1[x - CWHLLB][j];
                            SigBarCWVLqB[x][j] = VMOM1B[x - CWHLLB][j];
                            VMOM1[x][j] = VCRWMALq[x - CWHLLB][j];
                            VMOM2[x][j] = VMOM1[x - CWHLLB][j];
                            VMOM1B[x][j] = VCRWMALqB[x - CWHLLB][j];
                            VMOM2B[x][j] = VMOM1B[x - CWHLLB][j];
                            //PMOM1[X]=0;
                            //PMOM2[X]=0;
                            //PMOM1B[X]=0;
                            //PMOM2B[X]=0;
                        }
                    }

                    if (data[x - 2].High >= highestHigh(data[x - 2].High, MSTRSwingHL) && data[x].High < data[x - 2].High && data[x - 1].High < data[x - 2].High && data[x - 2].High > CXMA[x - 2]
                        && data[x - 2].Low != lowestLow(data[x - 2].Low, MSTRSwingHL)) {
                        SigBarPH[x] = x - 2;
                        SigBarPH2q[x] = x - 2;
                        SigBarVL[x] = 0;
                        P1H[x] = data[x - 2].High;
                        PNum[x] = PNum[x] + 1;
                        VNum[x] = 0;
                        Peak1[x] = true;
                        Valley1[x] = false;

                        // for (let z = 1; z <= Agree; z++) {
                        //     CWMAP1Hq[x][z] = RPMOM1[x - CWHLLB][z];
                        //     RPMOM1[x][z] = RVCRWMASq[x - CWHLLB][z];
                        //     RPMOM2[x][z] = RPMOM1[x - CWHLLB][z];
                        //     //RVMOM1[Z]=0;
                        //     //RVMOM2[Z]=0;
                        //     CWMAP1HqB[x][z] = RPMOM1B[x - CWHLLB][z];
                        //     RPMOM1B[x][z] = RVCRWMASqB[x - CWHLLB][z];
                        //     RPMOM2B[x][z] = RPMOM1B[x - CWHLLB][z];
                        //     //RVMOM1B[Z]=0;
                        //     //RVMOM2B[Z]=0;
                        // }

                        for (let j = 1; j <= Size; j++) {
                            SigBarCWPHq[x][j] = PMOM1[x - CWHLLB][j];
                            SigBarCWPHqB[x][j] = PMOM1B[x - CWHLLB][j];
                            PMOM1[x][j] = VCRWMASq[x - CWHLLB][j];
                            PMOM2[x][j] = PMOM1[x - CWHLLB][j];
                            //VMOM1[X]=0;
                            //VMOM2[X]=0;
                            PMOM1B[x][j] = VCRWMASqB[x - CWHLLB][j];
                            PMOM2B[x][j] = PMOM1B[x - CWHLLB][j];
                            //VMOM1B[X]=0;
                            //VMOM2B[X]=0;
                        }
                    }
                }
            }


            if (SWINGSETUP === 4) {
                if (SHLType === 1) {
                    if (data[x - 2].Low <= lowestLow(data[x - 2].Low, MSTRSwingHL) && data[x].Low > data[x - 2].Low && data[x - 1].Low > data[x - 2].Low && data[x - 2].Low < CXMA[x - 2]
                        && data[x - 2].High != highestHigh(data[x - 2].High, MSTRSwingHL)) {
                        SigBarVL[x] = x - 2;
                        SigBarVL2q[x] = x - 2;
                        SigBarPH[x] = 0;
                        V1L[x] = data[x - 2].Low;
                        VNum[x] = VNum[x] + 1;
                        PNum[x] = 0;
                        Valley1[x] = true;
                        Peak1[x] = false;

                        // for (let z = 1; z <= Agree; z++) {
                        //     CWMAV1Lq[x][z] = RVCRWMALq[x - CWHLLB][z];
                        //     RVMOM1[x][z] = RVCRWMALq[x - CWHLLB][z];
                        //     RVMOM2[x][z] = RVMOM1[x - CWHLLB][z];
                        //     // RPMOM1[Z]=0;
                        //     // RPMOM2[Z]=0;
                        //     CWMAV1LqB[x][z] = RVMOM1[x - CWHLLB][z];
                        //     RVMOM1B[x][z] = RVCRWMALqB[x - CWHLLB][z];
                        //     RVMOM2B[x][z] = RVMOM1B[x - CWHLLB][z];
                        //     // RPMOM1B[Z]=0;
                        //     // RPMOM2B[Z]=0;
                        // }

                        for (let j = 1; j <= Size; j++) {
                            SigBarCWVLq[x][j] = VCRWMALq[x - CWHLLB][j];
                            SigBarCWVLqB[x][j] = VMOM1[x - CWHLLB][j];
                            VMOM1[x][j] = VCRWMALq[x - CWHLLB][j];
                            VMOM2[x][j] = VMOM1[x - CWHLLB][j];
                            VMOM1B[x][j] = VCRWMALqB[x - CWHLLB][j];
                            VMOM2B[x][j] = VMOM1B[x - CWHLLB][j];
                            // PMOM1[X]=0;
                            // PMOM2[X]=0;
                            // PMOM1B[X]=0;
                            // PMOM2B[X]=0;
                        }
                    }

                    if (data[x - 2].High >= highestHigh(data[x - 2].High, MSTRSwingHL) && data[x].High < data[x - 2].High && data[x - 1].High < data[x - 2].High && data[x - 2].High > CXMA[x - 2]
                        && data[x - 2].Low != lowestLow(data[x - 2].Low, MSTRSwingHL)) {
                        SigBarPH[x] = x - 2;
                        SigBarPH2q[x] = x - 2;
                        SigBarVL[x] = 0;
                        P1H[x] = data[x - 2].High;
                        PNum[x] = PNum[x] + 1;
                        VNum[x] = 0;
                        Peak1[x] = true;
                        Valley1[x] = false;

                        // for (let z = 1; z <= Agree; z++) {
                        //     CWMAP1Hq[x][z] = RVCRWMASq[x - CWHLLB][z];
                        //     RPMOM1[x][z] = RVCRWMASq[x - CWHLLB][z];
                        //     RPMOM2[x][z] = RPMOM1[x - CWHLLB][z];
                        //     // RVMOM1[Z]=0;
                        //     // RVMOM2[Z]=0;
                        //     CWMAP1HqB[x][z] = RPMOM1[x - CWHLLB][z];
                        //     RPMOM1B[x][z] = RVCRWMASqB[x - CWHLLB][z];
                        //     RPMOM2B[x][z] = RPMOM1B[x - CWHLLB][z];
                        //     // RVMOM1B[Z]=0;
                        //     // RVMOM2B[Z]=0;
                        // }

                        for (let j = 1; j <= Size; j++) {
                            SigBarCWPHq[x][j] = VCRWMASq[x - CWHLLB][j];
                            SigBarCWPHqB[x][j] = PMOM1[x - CWHLLB][j];
                            PMOM1[x][j] = VCRWMASq[x - CWHLLB][j];
                            PMOM2[x][j] = PMOM1[x][j];
                            // VMOM1[X]=0;
                            // VMOM2[X]=0;
                            PMOM1B[x][j] = VCRWMASqB[x - CWHLLB][j];
                            PMOM2B[x][j] = PMOM1B[x - CWHLLB][j];
                            // VMOM1B[X]=0;
                            // VMOM2B[X]=0;
                        }
                    }
                }
            }
        }

        if (MOMSPOT === 2) {
            if (SWINGSETUP === 1) {
                if (SHLType === 1) {
                    if (data[x - 2].Low <= lowestLow(data[x - 2].Low, MSTRSwingHL) && data[x].Low > data[x - 2].Low && data[x - 1].Low > data[x - 2].Low && data[x - 2].Low < CXMA[x - 2]
                        && data[x - 2].High != highestHigh(data[x - 2].High, MSTRSwingHL)) {
                        SigBarVL[x] = x - 2;
                        SigBarVL2q[x] = x - 2;
                        //SigBarPH=0;
                        V1L[x] = data[x - 2].Low;
                        VNum[x] = VNum[x] + 1;
                        PNum[x] = 0;
                        Valley1[x] = true;
                        Peak1[x] = false;
                        MOVEDN[x] = Math.round((SigBarVL[x] - SigBarPH[x]) / 2);
                        if (MOVEDN[x] < 1) { MOVEDN[x] = 1; }
                        // for (let z=1; z <= Agree; z++) {
                        // CWMAV1Lq[x][z] = RVCRWMALq[x-MOVEDN[x]][z];
                        // RVMOM1[x][z] = RVCRWMALq[x-MOVEDN[x]][z];
                        // RVMOM2[x][z] = RVMOM1[x-MOVEDN[x]][z];
                        // RPMOM1[x][z] = 0;
                        // RPMOM2[x][z] = 0;
                        // CWMAV1LqB[x][z] = RVCRWMALqB[x-MOVEDN[x]][z];
                        // RVMOM1B[x][z] = RVCRWMALqB[x-MOVEDN[x]][z];
                        // RVMOM2B[x][z] = RVMOM1B[x-MOVEDN[x]][z];
                        // RPMOM1B[x][z] = 0;
                        // RPMOM2B[x][z] = 0;
                        // }
                        for (let j = 1; j <= Size; j++) {
                            SigBarCWVLq[x][j] = VCRWMALq[x - MOVEDN[x]][j];
                            SigBarCWVLqB[x][j] = VCRWMALqB[x - MOVEDN[x]][j];
                            VMOM1[x][j] = VCRWMALq[x - MOVEDN[x]][j];
                            VMOM2[x][j] = VMOM1[x - MOVEDN[x]][j];
                            VMOM1B[x][j] = VCRWMALqB[x - MOVEDN[x]][j];
                            VMOM2B[x][j] = VMOM1B[x - MOVEDN[x]][j];
                            PMOM1[x][j] = 0;
                            PMOM2[x][j] = 0;
                            PMOM1B[x][j] = 0;
                            PMOM2B[x][j] = 0;
                        }
                    }

                    if (data[x - 2].High >= highestHigh(data[x - 2].High, MSTRSwingHL) && data[x].High < data[x - 2].High && data[x - 1].High < data[x - 2].High && data[x - 2].High > CXMA[x - 2]
                        && data[x - 2].Low != lowestLow(data[x - 2].Low, MSTRSwingHL)) {
                        SigBarPH[x] = x - 2;
                        SigBarPH2q[x] = x - 2;
                        SigBarVL[x] = 0;
                        P1H[x] = data[x - 2].High;
                        PNum[x] = PNum[x] + 1;
                        VNum[x] = 0;
                        Peak1[x] = true;
                        Valley1[x] = false;
                        MOVEUP[x] = Math.round((SigBarPH[x] - SigBarVL[x]) / 2);
                        if (MOVEUP[x] < 1) { MOVEUP[x] = 1; };
                        // for (let z=1; z <= Agree; z++) {
                        // CWMAP1Hq[x][z] = RVCRWMASq[x-MOVEUP[x]][z];
                        // RPMOM1[x][z] = RVCRWMASq[x-MOVEUP[x]][z];
                        // RPMOM2[x][z] = RPMOM1[x-MOVEUP[x]][z];
                        // RVMOM1[x][z] = 0;
                        // RVMOM2[x][z] = 0;
                        // CWMAP1HqB[x][z] = RVCRWMASqB[x-MOVEUP[x]][z];
                        // RPMOM1B[x][z] = RVCRWMASqB[x-MOVEUP[x]][z];
                        // RPMOM2B[x][z] = RPMOM1B[x-MOVEUP[x]][z];
                        // RVMOM1B[x][z] = 0;
                        // RVMOM2B[x][z] = 0;
                        // }
                        for (let j = 1; j <= Size; j++) {
                            SigBarCWPHq[x][j] = VCRWMASq[x - MOVEUP[x]][j];
                            SigBarCWPHqB[x][j] = VCRWMASqB[x - MOVEUP[x]][j];
                            PMOM1[x][j] = VCRWMASq[x - MOVEUP[x]][j];
                            PMOM2[x][j] = PMOM1[x - MOVEUP[x]][j];
                            VMOM1[x][j] = 0;
                            VMOM2[x][j] = 0;
                            PMOM1B[x][j] = VCRWMASqB[x - MOVEUP[x]][j];
                            PMOM2B[x][j] = PMOM1B[x - MOVEUP[x]][j];
                            VMOM1B[x][j] = 0;
                            VMOM2B[x][j] = 0;
                        }
                    }
                }
            }


            if (SWINGSETUP === 2) {
                if (SHLType === 1) {
                    if (data[x - 2].Low <= lowestLow(data[x - 2].Low, MSTRSwingHL) && data[x].Low > data[x - 2].Low && data[x - 1].Low > data[x - 2].Low && data[x - 2].Low < CXMA[x - 2]
                        && data[x - 2].High != highestHigh(data[x - 2].High, MSTRSwingHL)) {
                        SigBarVL[x] = x - 2;
                        SigBarVL2q[x] = x - 2;
                        //SigBarPH=0;
                        V1L[x] = data[x - 2].Low;
                        VNum[x] = VNum[x] + 1;
                        PNum[x] = 0;
                        Valley1[x] = true;
                        Peak1[x] = false;
                        MOVEDN[x] = Math.round((SigBarVL[x] - SigBarPH[x]) / 2);
                        if (MOVEDN[x] < 1) { MOVEDN[x] = 1; }
                        // for (let z = 1; z <= Agree; z++) {
                        //     CWMAV1Lq[x][z] = RVMOM1[x - MOVEDN[x]][z];
                        //     RVMOM1[x][z] = RVCRWMALq[x - MOVEDN[x]][z];
                        //     RVMOM2[x][z] = RVMOM1[x - MOVEDN[x]][z];
                        //     RPMOM1[x][z] = 0;
                        //     RPMOM2[x][z] = 0;
                        //     CWMAV1LqB[x][z] = RVMOM1B[x - MOVEDN[x]][z];
                        //     RVMOM1B[x][z] = RVCRWMALqB[x - MOVEDN[x]][z];
                        //     RVMOM2B[x][z] = RVMOM1B[x - MOVEDN[x]][z];
                        //     RPMOM1B[x][z] = 0;
                        //     RPMOM2B[x][z] = 0;
                        // }
                        for (let j = 1; j <= Size; j++) {
                            SigBarCWVLq[x][j] = VMOM1[x - MOVEDN[x]][j];
                            SigBarCWVLqB[x][j] = VMOM1B[x - MOVEDN[x]][j];
                            VMOM1[x][j] = VCRWMALq[x - MOVEDN[x]][j];
                            VMOM2[x][j] = VMOM1[x - MOVEDN[x]][j];
                            VMOM1B[x][j] = VCRWMALqB[x - MOVEDN[x]][j];
                            VMOM2B[x][j] = VMOM1B[x - MOVEDN[x]][j];
                            PMOM1[x][j] = 0;
                            PMOM2[x][j] = 0;
                            PMOM1B[x][j] = 0;
                            PMOM2B[x][j] = 0;
                        }
                    }

                    if (data[x - 2].High >= highestHigh(data[x - 2].High, MSTRSwingHL) && data[x].High < data[x - 2].High && data[x - 1].High < data[x - 2].High && data[x - 2].High > CXMA[x - 2]
                        && data[x - 2].Low != lowestLow(data[x - 2].Low, MSTRSwingHL)) {
                        SigBarPH[x] = x - 2;
                        SigBarPH2q[x] = x - 2;
                        //SigBarVL=0;
                        P1H[x] = data[x - 2].High;
                        PNum[x] = PNum[x] + 1;
                        VNum[x] = 0;
                        Peak1[x] = true;
                        Valley1[x] = false;
                        MOVEUP[x] = Math.round((SigBarPH[x] - SigBarVL[x]) / 2);
                        if (MOVEUP[x] < 1) { MOVEUP[x] = 1; }
                        // for (let z = 1; z <= Agree; z++) {
                        //     CWMAP1Hq[x][z] = RPMOM1[x - MOVEUP[x]][z];
                        //     RPMOM1[x][z] = RVCRWMASq[x - MOVEUP[x]][z];
                        //     RPMOM2[x][z] = RPMOM1[x - MOVEUP[x]][z];
                        //     RVMOM1[x][z] = 0;
                        //     RVMOM2[x][z] = 0;
                        //     CWMAP1HqB[x][z] = RPMOM1B[x - MOVEUP[x]][z];
                        //     RPMOM1B[x][z] = RVCRWMASqB[x - MOVEUP[x]][z];
                        //     RPMOM2B[x][z] = RPMOM1B[x - MOVEUP[x]][z];
                        //     RVMOM1B[x][z] = 0;
                        //     RVMOM2B[x][z] = 0;
                        // }
                        for (let j = 1; j <= Size; j++) {
                            SigBarCWPHq[x][j] = PMOM1[x - MOVEUP[x]][j];
                            SigBarCWPHqB[x][j] = PMOM1B[x - MOVEUP[x]][j];
                            PMOM1[x][j] = VCRWMASq[x - MOVEUP[x]][j];
                            PMOM2[x][j] = PMOM1[x - MOVEUP[x]][j];
                            VMOM1[x][j] = 0;
                            VMOM2[x][j] = 0;
                            PMOM1B[x][j] = VCRWMASqB[x - MOVEUP[x]][j];
                            PMOM2B[x][j] = PMOM1B[x - MOVEUP[x]][j];
                            VMOM1B[x][j] = 0;
                            VMOM2B[x][j] = 0;
                        }
                    }
                }
            }

            if (SWINGSETUP === 3) {
                if (SHLType === 1) {
                    if (data[x - 2].Low <= lowestLow(data[x - 2].Low, MSTRSwingHL) && data[x].Low > data[x - 2].Low && data[x - 1].Low > data[x - 2].Low && data[x - 2].Low < CXMA[x - 2]
                        && data[x - 2].High != highestHigh(data[x - 2].High, MSTRSwingHL)) {
                        SigBarVL[x] = x - 2;
                        SigBarVL2q[x] = x - 2;
                        //SigBarPH=0;
                        V1L[x] = data[x - 2].Low;
                        VNum[x] = VNum[x] + 1;
                        PNum[x] = 0;
                        Valley1[x] = true;
                        Peak1[x] = false;
                        MOVEDN[x] = Math.round((SigBarVL[x] - SigBarPH[x]) / 2);
                        if (MOVEDN[x] < 1) { MOVEDN[x] = 1; }

                        // for (let z = 1; z <= Agree; z++) {
                        //     CWMAV1Lq[x][z] = RVMOM1[x - MOVEDN[x]][z];
                        //     RVMOM1[x][z] = RVCRWMALq[x - MOVEDN[x]][z];
                        //     RVMOM2[x][z] = RVMOM1[x - MOVEDN[x]][z];
                        //     //RPMOM1[Z]=0;
                        //     //RPMOM2[Z]=0;
                        //     CWMAV1LqB[x][z] = RVMOM1B[x - MOVEDN[x]][z];
                        //     RVMOM1B[x][z] = RVCRWMALqB[x - MOVEDN[x]][z];
                        //     RVMOM2B[x][z] = RVMOM1B[x - MOVEDN[x]][z];
                        //     //RPMOM1B[Z]=0;
                        //     //RPMOM2B[Z]=0;
                        // }

                        for (let j = 1; j <= Size; j++) {
                            SigBarCWVLq[x][j] = VMOM1[x - MOVEDN[x]][j];
                            SigBarCWVLqB[x][j] = VMOM1B[x - MOVEDN[x]][j];
                            VMOM1[x][j] = VCRWMALq[x - MOVEDN[x]][j];
                            VMOM2[x][j] = VMOM1[x - MOVEDN[x]][j];
                            VMOM1B[x][j] = VCRWMALqB[x - MOVEDN[x]][j];
                            VMOM2B[x][j] = VMOM1B[x - MOVEDN[x]][j];
                            //PMOM1[X]=0;
                            //PMOM2[X]=0;
                            //PMOM1B[X]=0;
                            //PMOM2B[X]=0;
                        }
                    }

                    if (data[x - 2].High >= highestHigh(data[x - 2].High, MSTRSwingHL) && data[x].High < data[x - 2].High && data[x - 1].High < data[x - 2].High && data[x - 2].High > CXMA[x - 2]
                        && data[x - 2].Low != lowestLow(data[x - 2].Low, MSTRSwingHL)) {
                        SigBarPH[x] = x - 2;
                        SigBarPH2q[x] = x - 2;
                        //SigBarVL=0;
                        P1H[x] = data[x - 2].High;
                        PNum[x] = PNum[x] + 1;
                        VNum[x] = 0;
                        Peak1[x] = true;
                        Valley1[x] = false;
                        MOVEUP[x] = Math.round((SigBarPH[x] - SigBarVL[x]) / 2);
                        if (MOVEUP[x] < 1) { MOVEUP[x] = 1; }
                        // for (let z = 1; z <= Agree; z++) {
                        //     CWMAP1Hq[x][z] = RPMOM1[x - MOVEUP[x]][z];
                        //     RPMOM1[x][z] = RVCRWMASq[x - MOVEUP[x]][z];
                        //     RPMOM2[x][z] = RPMOM1[x - MOVEUP[x]][z];
                        //     //RVMOM1[Z]=0;
                        //     //RVMOM2[Z]=0;
                        //     CWMAP1HqB[x][z] = RPMOM1B[x - MOVEUP[x]][z];
                        //     RPMOM1B[x][z] = RVCRWMASqB[x - MOVEUP[x]][z];
                        //     RPMOM2B[x][z] = RPMOM1B[x - MOVEUP[x]][z];
                        //     //RVMOM1B[Z]=0;
                        //     //RVMOM2B[Z]=0;
                        // }
                        for (let j = 1; j <= Size; j++) {
                            SigBarCWPHq[x][j] = PMOM1[x - MOVEUP[x]][j];
                            SigBarCWPHqB[x][j] = PMOM1B[x - MOVEUP[x]][j];
                            PMOM1[x][j] = VCRWMASq[x - MOVEUP[x]][j];
                            PMOM2[x][j] = PMOM1[x - MOVEUP[x]][j];
                            //VMOM1[X]=0;
                            //VMOM2[X]=0;
                            PMOM1B[x][j] = VCRWMASqB[x - MOVEUP[x]][j];
                            PMOM2B[x][j] = PMOM1B[x - MOVEUP[x]][j];
                            //VMOM1B[X]=0;
                            //VMOM2B[X]=0;
                        }
                    }
                }
            }


            if (SWINGSETUP === 4) {
                if (SHLType === 1) {
                    if (data[x - 2].Low <= lowestLow(data[x - 2].Low, MSTRSwingHL) && data[x].Low > data[x - 2].Low && data[x - 1].Low > data[x - 2].Low && data[x - 2].Low < CXMA[x - 2]
                        && data[x - 2].High != highestHigh(data[x - 2].High, MSTRSwingHL)) {
                        SigBarVL[x] = x - 2;
                        SigBarVL2q = x - 2;
                        //SigBarPH=0;
                        V1L[x] = data[x - 2].Low;
                        VNum[x] = VNum[x] + 1;
                        PNum[x] = 0;
                        Valley1[x] = true;
                        Peak1[x] = false;
                        MOVEDN[x] = Math.round((SigBarVL[x] - SigBarPH[x]) / 2);
                        if (MOVEDN[x] < 1) { MOVEDN[x] = 1; };

                        // for (let z = 1; z <= Agree; z++) {
                        //     CWMAV1Lq[x][Z] = RVCRWMALq[x - MOVEDN[x]][z];
                        //     RVMOM1[x][z] = RVCRWMALq[x - MOVEDN[x]][z];
                        //     RVMOM2[x][z] = RVMOM1[x - MOVEDN[x]][z];
                        //     // RPMOM1[Z]=0;
                        //     // RPMOM2[Z]=0;
                        //     CWMAV1LqB[x][z] = RVMOM1[x - MOVEDN[x]][z];
                        //     RVMOM1B[x][z] = RVCRWMALqB[x - MOVEDN[x]][z];
                        //     RVMOM2B[x][z] = RVMOM1B[x - MOVEDN[x]][z];
                        //     // RPMOM1B[Z]=0;
                        //     // RPMOM2B[Z]=0;
                        // }

                        for (let j = 1; j <= Size; j++) {
                            SigBarCWVLq[x][j] = VCRWMALq[x - MOVEDN[x]][j];
                            SigBarCWVLqB[x][j] = VMOM1[x - MOVEDN[x]][j][MOVEDN];
                            VMOM1[x][j] = VCRWMALq[x - MOVEDN[x]][j];
                            VMOM2[x][j] = VMOM1[x - MOVEDN[x]][j];
                            VMOM1B[x][j] = VCRWMALqB[x - MOVEDN[x]][j];
                            VMOM2B[x][j] = VMOM1B[x - MOVEDN[x]][j];
                            // PMOM1[j]=0;
                            // PMOM2[j]=0;
                            // PMOM1B[j]=0;
                            // PMOM2B[j]=0;
                        }
                    }

                    if (data[x - 2].High >= highestHigh(data[x - 2].High, MSTRSwingHL) && data[x].High < data[x - 2].High && data[x - 1].High < data[x - 2].High && data[x - 2].High > CXMA[x - 2]
                        && data[x - 2].Low != lowestLow(data[x - 2].Low, MSTRSwingHL)) {
                        SigBarPH[x] = x - 2;
                        SigBarPH2q = x - 2;
                        //SigBarVL=0;
                        P1H[x] = data[x - 2].High;
                        PNum[x] = PNum[x] + 1;
                        VNum[x] = 0;
                        Peak1[x] = true;
                        Valley1[x] = false;
                        MOVEUP[x] = Math.round((SigBarPH[x] - SigBarVL[x]) / 2);
                        if (MOVEUP[x] < 1) { MOVEUP[x] = 1; };

                        // for (let z = 1; z <= Agree; z++) {
                        //     CWMAP1Hq[x][z] = RVCRWMASq[x - MOVEUP[x]][z];
                        //     RPMOM1[x][z] = RVCRWMASq[x - MOVEUP[x]][z];
                        //     RPMOM2[x][z] = RPMOM1[x - MOVEUP[x]][z];
                        //     // RVMOM1[Z]=0;
                        //     // RVMOM2[Z]=0;
                        //     CWMAP1HqB[x][z] = RPMOM1[x - MOVEUP[x]][z];
                        //     RPMOM1B[x][z] = RVCRWMASqB[x - MOVEUP[x]][z];
                        //     RPMOM2B[x][z] = RPMOM1B[x - MOVEUP[x]][z];
                        //     RVMOM1B[x][z] = 0;
                        //     RVMOM2B[x][z] = 0;
                        // }

                        for (let j = 1; j <= Size; j++) {
                            SigBarCWPHq[x][j] = VCRWMASq[x - MOVEUP[x]][j];
                            SigBarCWPHqB[x][j] = PMOM1[x - MOVEUP[x]][j];
                            PMOM1[x][j] = VCRWMASq[x - MOVEUP[x]][j];
                            PMOM2[x][j] = PMOM1[x - MOVEUP[x]][j];
                            // VMOM1[j]=0;
                            // VMOM2[j]=0;
                            PMOM1B[x][j] = VCRWMASqB[x - MOVEUP[x]][j];
                            PMOM2B[x][j] = PMOM1B[x - MOVEUP[x]][j];
                            // VMOM1B[j]=0;
                            // VMOM2B[j]=0;
                        }
                    }
                }
            }
        }
        PVFilterLq[x] = PVFilterLq[x - 1];
        PVFilterSq[x] = PVFilterSq[x - 1];

        if (PVNumFilter === 0) {
            for (let i = 1; i <= Size; i++) {
                PVFilterLq[x][i] = true;
                PVFilterSq[x][i] = true;
            }
        }

        // If PVNumFilter=1 then begin
        // For X=1 to Size begin
        // If PMOM1[X]<PMOM2[X] and PNum>=PVNum then PVFilterS#[X]=True else PVFilterS#[X]=false;
        // If VMOM1[X]>VMOM2[X] and VNum>=PVNum then PVFilterL#[X]=True else PVFilterL#[X]=false;
        // end;
        // end;

        // If PVNumFilter=2 then begin
        // For X=1 to Size begin
        // If PMOM1[X]>PMOM2[X] and PNum>=PVNum then PVFilterS#[X]=True else PVFilterS#[X]=false;
        // If VMOM1[X]<VMOM2[X] and VNum>=PVNum then PVFilterL#[X]=True else PVFilterL#[X]=false;
        // end;
        // end;


        // If PVFilter=1 then begin
        // If Peak1 and Close<CXMA then begin
        // Peak1=false;
        // end;
        // If Valley1 and Close>CXMA then begin
        // Valley1=false;
        // end;
        // end;

        if (BreakFilter === 0) {
            BF0[x] = true;
        }

        // If BreakFilter=1 then begin
        // If LoBand20<=V1L then BF1L=true else BF1L=false;
        // If HiBand20>=P1H then BF1S=true else BF1S=false;
        // end;

        // If BreakFilter=2 then begin
        // If LoBand20>=V1L then BF2L=true else BF2L=false;
        // If HiBand20<=P1H then BF2S=true else BF2S=false;
        // end;

        // If BreakFilter=3 then begin
        // If LoBand20>=V1L then BF2L=true else BF2L=false;
        // If BF2L then LoBand20=V1L else LoBand20=LoBand20;
        // If HiBand20<=P1H then BF2S=true else BF2S=false;
        // If BF2S then HiBand20=P1H else HiBand20=HiBand20;
        // end;

        if (BreakFilter === 4) {
            if (LoBand20[x] >= V1L[x]) { BF2L[x] = true } else { BF2L[x] = false; }
            if (BF2L[x]) { LoBand20[x] = V1L[x] - OneTick } else { LoBand20[x] = LoBand20[x]; }
            if (HiBand20[x] <= P1H[x]) { BF2S[x] = true } else { BF2S[x] = false; }
            if (BF2S[x]) { HiBand20[x] = P1H[x] + OneTick } else { HiBand20[x] = HiBand20[x]; }
        }

        Config1[x] = Config1[x - 1];
        Config2[x] = Config2[x - 1];
        Config3L[x] = Config3L[x - 1];
        Config3S[x] = Config3S[x - 1];
        Config4L[x] = Config4L[x - 1];
        Config4S[x] = Config4S[x - 1];

        if (SwingHLFilter === 0 || SwingHLFilter === -1) { Config0 = true; } else { Config0 = false; };
        if (SwingHLFilter === 1 && SHLROVq[x] > SHLROVBq[x] * SwingHLMult) { Config1[x] = true } else { Config1[x] = false };
        if (SwingHLFilter === 2 && SHLROVq[x] < SHLROVBq[x] * SwingHLMult) { Config2[x] = true } else { Config2[x] = false };
        if (SwingHLFilter === 3 && SHROVq[x] > SHHROVBq[x] * SwingHLMult) { Config3S[x] = true } else { Config3S[x] = false };
        if (SwingHLFilter === 3 && SLROVq[x] > SLLROVBq[x] * SwingHLMult) { Config3L[x] = true } else { Config3L[x] = false };
        if (SwingHLFilter === 4 && SHROVq[x] < SHHROVBq[x] * SwingHLMult) { Config4S[x] = true } else { Config4S[x] = false };
        if (SwingHLFilter === 4 && SLROVq[x] < SLLROVBq[x] * SwingHLMult) { Config4L[x] = true } else { Config4L[x] = false };
        if (SwingHLFilter === 5) {
            if (SwingHLFilter === 5 && SHROVq[x] > SLROVq[x] * SwingHLMult) { Config3S[x] = true } else { Config3S[x] = false };
            if (SwingHLFilter === 5 && SLROVq[x] > SHROVq[x] * SwingHLMult) { Config3L[x] = true } else { Config3L[x] = false };
        }
        if (SwingHLFilter === 6) {
            if (SwingHLFilter === 6 && SHROVq[x] < SLROVq[x] * SwingHLMult) { Config4S[x] = true } else { Config4S[x] = false };
            if (SwingHLFilter === 6 && SLROVq[x] < SHROVq[x] * SwingHLMult) { Config4L[x] = true } else { Config4L[x] = false };
        }
        if (SwingHLFilter === 7) {
            if (SwingHLFilter === 7 && SHROVq[x] > SHHROVBq[x] * SwingHLMult && SHROVq[x] > SLROVq[x] * SwingHLMult) { Config3S[x] = true } else { Config3S[x] = false };
            if (SwingHLFilter === 7 && SLROVq[x] > SLLROVBq[x] * SwingHLMult && SLROVq[x] > SHROVq[x] * SwingHLMult) { Config3L[x] = true } else { Config3L[x] = false };
        }
        if (SwingHLFilter === 8) {
            if (SwingHLFilter === 8 && SHROVq[x] < SHHROVBq[x] * SwingHLMult && SHROVq[x] < SLROVq[x] * SwingHLMult) { Config4S[x] = true } else { Config4S[x] = false };
            if (SwingHLFilter === 8 && SLROVq[x] < SLLROVBq[x] * SwingHLMult && SLROVq[x] < SHROVq[x] * SwingHLMult) { Config4L[x] = true } else { Config4L[x] = false };
        }
        if (SwingHLFilter === 9) {
            if (SwingHLFilter === 9 && SHROVq[x] > SHHROVBq[x] * SwingHLMult && SHROVq[x] < SLROVq[x] * SwingHLMult) { Config3S[x] = true } else { Config3S[x] = false };
            if (SwingHLFilter === 9 && SLROVq[x] > SLLROVBq[x] * SwingHLMult && SLROVq[x] < SHROVq[x] * SwingHLMult) { Config3L[x] = true } else { Config3L[x] = false };
        }
        if (SwingHLFilter === 10) {
            if (SwingHLFilter === 10 && SHROVq[x] < SHHROVBq[x] * SwingHLMult && SHROVq[x] > SLROVq[x] * SwingHLMult) { Config4S[x] = true } else { Config4S[x] = false };
            if (SwingHLFilter === 10 && SLROVq[x] < SLLROVBq[x] * SwingHLMult && SLROVq[x] > SHROVq[x] * SwingHLMult) { Config4L[x] = true } else { Config4L[x] = false };
        }



        if (MSTRConfig === 0) {
            if (data[x].Close > LoBand20[x] && (Config0 || Config1[x] || Config2[x] || Config3L[x] || Config4L[x]) && DHLFL[x]) { NTL1[x] = true } else { NTL1[x] = false };
            if (data[x].Close < HiBand20[x] && (Config0 || Config1[x] || Config2[x] || Config3S[x] || Config4S[x]) && DHLFS[x]) { NTH1[x] = true } else { NTH1[x] = false };
        }

        // If MSTRConfig=.5 then begin
        // If Close>LoBand20 and DHLFL then NTL1=true else NTL1=false;
        // If Close<HiBand20 and DHLFS then NTH1=true else NTH1=false;
        // end;

        // If MSTRConfig=1 then begin
        // If SHROV>SLROV and SHROV>SLLROVB and Close>LoBand20 and (Config0 or Config1 or Config2 or Config3L or Config4L) and DHLFL then NTL1=true else NTL1=false;
        // If SLROV>SHROV and SLROV>SHHROVB and Close<HiBand20 and (Config0 or Config1 or Config2 or Config3S or Config4S) and DHLFS then NTH1=true else NTH1=false;
        // end;

        // If MSTRConfig=1.5 then begin
        // If SHROV>SLROV and SHROV>SLLROVB and Close>LoBand20 and DHLFL then NTL1=true else NTL1=false;
        // If SLROV>SHROV and SLROV>SHHROVB and Close<HiBand20 and DHLFS then NTH1=true else NTH1=false;
        // end;

        // If MSTRConfig=2 then begin
        // If SHROV<SLROV and SHROV<SLLROVB and Close>LoBand20 and (Config0 or Config1 or Config2 or Config3L or Config4L) and DHLFL then NTL1=true else NTL1=false;
        // If SLROV<SHROV and SLROV<SHHROVB and Close<HiBand20 and (Config0 or Config1 or Config2 or Config3S or Config4S) and DHLFS then NTH1=true else NTH1=false;
        // end;

        // If MSTRConfig=2.5 then begin
        // If SHROV<SLROV and SHROV<SLLROVB and Close>LoBand20 and DHLFL then NTL1=true else NTL1=false;
        // If SLROV<SHROV and SLROV<SHHROVB and Close<HiBand20 and DHLFS then NTH1=true else NTH1=false;
        // end;

        DontGoShortq[x] = DontGoShortq[x - 1];
        DontGoLongq[x] = DontGoLongq[x - 1];

        for (let j = 1; j <= Size; j++) {

            if (MOMCombo === 0) {
                if (VCRWMALq[x][j] >= SigBarCWVLq[x][j]) { MOMComboL[x][j] = true } else { MOMComboL[x][j] = false };
                if (VCRWMASq[x][j] <= SigBarCWPHq[x][j]) { MOMComboS[x][j] = true } else { MOMComboS[x][j] = false };
            }

            if (MOMCombo === 1) {
                if (VCRWMALq[x][j] >= SigBarCWVLq[x][j] && VCRWMALqB[x][j] >= SigBarCWVLqB[x][j]) { MOMComboL[x][j] = true } else { MOMComboL[x][j] = false };
                if (VCRWMASq[x][j] <= SigBarCWPHq[x][j] && VCRWMASqB[x][j] <= SigBarCWPHqB[x][j]) { MOMComboS[x][j] = true } else { MOMComboS[x][j] = false };
            }

            if (MOMCombo === 2) {
                if (VCRWMALq[x][j] >= SigBarCWVLq[x][j] && VCRWMALqB[x][j] <= SigBarCWVLqB[x][j]) { MOMComboL[x][j] = true } else { MOMComboL[x][j] = false };
                if (VCRWMASq[x][j] <= SigBarCWPHq[x][j] && VCRWMASqB[x][j] >= SigBarCWPHqB[x][j]) { MOMComboS[x][j] = true } else { MOMComboS[x][j] = false };
            }

            if (MOMCombo === 0) {
                if (x - SigBarPH[x] <= Spacing && VCRWMASq[x][j] > SigBarCWPHq[x][j]) {
                    DontGoShortq[x][j] = true;
                }

                if (x - SigBarVL[x] <= Spacing && VCRWMALq[x][j] < SigBarCWVLq[x][j]) {
                    DontGoLongq[x][j] = true;
                }
            }

            if (MOMCombo === 1) {
                if (x - SigBarPH[x] <= Spacing && VCRWMASq[x][j] > SigBarCWPHq[x][j]) {
                    DontGoShortq[x][j] = true;
                }

                if (x - SigBarVL[x] <= Spacing && VCRWMALq[x][j] < SigBarCWVLq[x][j]) {
                    DontGoLongq[x][j] = true;
                }
            }

            if (MOMCombo === 2) {
                if (x - SigBarPH[x] <= Spacing && VCRWMASq[x][j] > SigBarCWPHq[x][j]) {
                    DontGoShortq[x][j] = true;
                }

                if (x - SigBarVL[x] <= Spacing && VCRWMALq[x][j] < SigBarCWVLq[x][j]) {
                    DontGoLongq[x][j] = true;
                }
            }

            if (x - SigBarPH[x] >= Spacing) {
                DontGoShortq[x][j] = false;
            }

            if (x - SigBarVL[x] >= Spacing) {
                DontGoLongq[x][j] = false;
            }

        }


        // {TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT}
        // {%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%}

        /*
        if (LookBackDays > 0) {
            if (EntryType === 1 || EntryType === 3) {
                if (VStratType === 1) {
                    for (let j = 1; j <= Size; j++) {

                        if (MPLq[x][j] === 1 && data[x].Low <=
                            EntryLevelLq[x][j] - StopLossConversion) {
                            MPLq[x][j] = 0;
                            LTradeNetProfitq[x][j] = -1 * StopLossConversion;
                            EntryLevelLq[x][j] = 0;
                        }
                        if (MPLq[x][j] === 1 && data[x].High >= THiBand20[x - 1] + OneTick) {
                            MPLq[x][j] = 0;
                            LTradeNetProfitq[x][j] = THiBand20[x - 1] -
                                EntryLevelLq[x][j];
                            EntryLevelLq[x][j] = 0;
                        }
                        if (MPLq[x][j] === 1 || x -
                            SigBarLq[x][j] >= 1) {
                            SigLq[x][j] = false;
                        }
                        if (MPLq[x][j] != 1 && Valley1[x] && x - SigBarVL <= Spacing && x - SigBarVL[x] >= StartSpacing &&
                            NTL1[x] && !DontTradeToday /*&& Time < TooLateEntry*/ /* && VMinDays &&
        DontGoLongq[x][j] === false &&
        PVFilterLq[x][j] &&
        PushLq[x][j] && (BF0 || BF1L || BF2L) &&
        MomComboL[x][j]) {
        SigBarLq[x][j] = x;
        SigLq[x][j] === true
    };
    if (SigLq[x - 1][j] &&
        MPLq[x][j] === 0 && x - 1 -
        SigBarLq[x - 1][j] <= 1 && data[x].Low <= LoBand20[x - 1] - OneTick) {
        SigLq[x][j] === false;
        if (data[x - 1].Close >= LoBand20[x - 1]) {
            EntryLevelLq[x][j] = LoBand20[x - 1];
        } if (data[x - 1].Close < LoBand20[x - 1]) {
            EntryLevelLq[x][j] = data[x].Open;
        }
        MPLq[x][j] = 1;
    };
    if (Exit2Lq[x][j] &&
        MPLq[x][j] === 1 &&
        MPLq[x - 1][j] === 1 && data[x].High >= XMA13[x - 1] + OneTick) {
        MPLq[x][j] = 0;
        LTradeNetProfitq[x][j] = XMA13[x - 1] -
            EntryLevelLq[x][j];
        Exit2Lq[x][j] = false;
        EntryLevelLq[x][j] = 0;
    };
    if (SafetyX === 1 && MPLq[x][j] === 1 &&
        MPLq[x - 1][j] === 1 && data[x].Low < XDLoBand[x - 1] && XDLoBand[x - 1] <
        EntryLevelLq[x][j]) {
        Exit2Lq[x][j] = true;
    };
    if (TExit2Lq[x][j] &&
        MPLq[x][j] === 1 &&
        MPLq[x - 1][j] === 1 && data[x].Low <= XMA13[x - 1]) {
        MPLq[x][j] = 0;
        LTradeNetProfitq[x][j] = XMA13[x - 1] -
            EntryLevelLq[x][j];
        TExit2Lq[x][j] = false;
        EntryLevelLq[x][j] = 0;
    };
    if (TExit2 === 1 && MPLq[x][j] === 1 &&
        MPLq[x - 1][j] === 1 && data[x].High > TX2HiBand20[x - 1] && TX2HiBand20[x - 1] >
        EntryLevelLq[x][j]) {
        TExit2Lq[x][j] = true;
    };
    if ((MPLq[x][j] === 1 && Time >= TooLate) || (ExitonFriday = 1 && dayofweek(date) === 5)) {
        MPLq[x][j] = 0;
        LTradeNetProfitq[x][j] = data[x].Close -
            EntryLevelLq[x][j];
        EntryLevelLq[x][j] = 0;
    };
    if (MPLq[x - 1][j] === 1 &&
        MPLq[x][j] != 1) {
        CumProfitsLq[x][j] =
            CumProfitsLq[x][j] +
            LTradeNetProfitq[x][j];
        Exit2Lq[x][j] = false;
        TExit2Lq[x][j] = false;
    };
    if (Date != Date[x - 1] && DailyBarCounter[x - 1] > MinDailyBars) {
        CumProfitsLq[x][j] = 0;
    };

    
    //  {&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&}


    //                    If MPSq[x][j] =-1 and High>=
    //               EntryLevelSq[x][j] +StopLossConversion then begin
    //                       MPSq[x][j] =0;
    //           STradeNetProfitq[x][j] =-StopLossConversion;
    //               EntryLevelSq[x][j] =0; end;
    //                    If MPSq[x][j] =-1 and Low<=TLoBand20[1]-OneTick then begin
    //                       MPSq[x][j] =0;
    //           STradeNetProfitq[x][j] =
    //               EntryLevelSq[x][j] -TLoBand20[1];
    //               EntryLevelSq[x][j] =0; end; 
    //                    If MPSq[x][j] =-1 or ThisBar-
    //                   SigBarSq[x][j] >=1 then begin
    //                      SigSq[x][j] =false; end;
    //                    If MPSq[x][j] <>-1 and Peak1 and ThisBar-SigBarPH<=Spacing and ThisBar-SigBarPH>=StartSpacing and NTH1 and DontTradeToday=false and Time<TooLateEntry and VMinDays and 
    //               DontGoShortq[x][j] =false and
    //                 PVFilterSq[x][j]  and 
    //                     PushSq[x][j]  and (BF0 or BF1S or BF2S) and
    //                  MomComboS[x][j]  then begin
    //                   SigBarSq[x][j] =ThisBar;
    //                      SigSq[x][j] =True; end;
    //                   If SigSq[x][j] [1] and 
    //                       MPSq[x][j] =0 and ThisBar[1]-
    //                   SigBarSq[x][j] [1]<=1 and High>=HiBand20[1]+OneTick then begin 
    //                      SigSq[x][j] =false; If Close[1]<=HiBand20[1] then begin
    //               EntryLevelSq[x][j] =HiBand20[1]; end; If Close[1]>HiBand20[1] then begin
    //               EntryLevelSq[x][j] =Open; end;
    //                       MPSq[x][j] =-1; end;
    //                 If Exit2Sq[x][j]  and 
    //                       MPSq[x][j] =-1 and 
    //                       MPSq[x][j] [1]=-1 and Low<=XMA13[1]-OneTick then begin
    //                       MPSq[x][j] =0;
    //           STradeNetProfitq[x][j] =
    //               EntryLevelSq[x][j] -XMA13[1];
    //                    Exit2Sq[x][j] =false;
    //               EntryLevelSq[x][j] =0; end;
    //      If SafetyX=1 and MPSq[x][j] =-1 and 
    //                       MPSq[x][j] [1]=-1 and High>XDHiBand[1] and XDHiBand[1]>
    //               EntryLevelSq[x][j]  then begin
    //                    Exit2Sq[x][j] =True; end;
    //                If TExit2Sq[x][j]  and 
    //                       MPSq[x][j] =-1 and 
    //                       MPSq[x][j] [1]=-1 and High>=XMA13[1] then begin
    //                       MPSq[x][j] =0;
    //           STradeNetProfitq[x][j] =
    //               EntryLevelSq[x][j] -XMA13[1];
    //                   TExit2Sq[x][j] =false;
    //               EntryLevelSq[x][j] =0; end;
    //       If TExit2=1 and MPSq[x][j] =-1 and 
    //                       MPSq[x][j] [1]=-1 and Low<TX2LoBand20[1] and TX2LoBand20[1]<
    //               EntryLevelSq[x][j]  then begin
    //                   TExit2Sq[x][j] =True; end;
    //                   If (MPSq[x][j] =-1 and Time>=TooLate) or (ExitonFriday=1 and dayofweek(date)=5) then begin 
    //                       MPSq[x][j] =0;
    //           STradeNetProfitq[x][j] =
    //               EntryLevelSq[x][j] -Close;
    //               EntryLevelSq[x][j] =0; end;
    //                    If MPSq[x][j] [1]=-1 and 
    //                       MPSq[x][j] <>-1 then begin
    //               CumProfitsSq[x][j] =
    //               CumProfitsSq[x][j] +
    //           STradeNetProfitq[x][j] ;
    //                    Exit2Sq[x][j] =false;
    //                   TExit2Sq[x][j] =false; end; If Date<>Date[1] and DailyBarCounter[1]>MinDailyBars then begin
    //               CumProfitsSq[x][j] =0; end; 


}
}
}
*/

        // {TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT}
        // {%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%}



        // If EntryType=1 or EntryType=3 then begin
        // If VStratType=2 then begin
        // For X=1 to Size begin

        //                   If MPL#[X]=-1 and Low<=
        //              EntryLevelL#[X]-(StopLossConversion-OneTick) then begin
        //                      MPL#[X]=0; 
        //          LTradeNetProfit#[X]=(StopLossConversion-OneTick);
        //              EntryLevelL#[X]=0; end;
        //                   If MPL#[X]=-1 and High>=THiBand20[1]+OneTick then begin
        //                      MPL#[X]=0;
        //          LTradeNetProfit#[X]=
        //              EntryLevelL#[X]-(THiBand20[1]+OneTick);
        //              EntryLevelL#[X]=0; end;                   
        //                   If MPL#[X]=-1 or ThisBar-
        //                  SigBarL#[X]>=-1 then begin
        //                     SigL#[X]=false; end;
        //                   If MPL#[X]<>-1 and Valley1 and ThisBar-SigBarVL<=Spacing and ThisBar-SigBarVL>=StartSpacing and NTL1 and DontTradeToday=false and Time<TooLateEntry and VMinDays and 
        //               DontGoLong#[X]=false and
        //                PVFilterL#[X] and
        //                    PushL#[X] and (BF0 or BF1L or BF2L) and
        //                 MomComboL[X] then begin
        //                  SigBarL#[X]=ThisBar;
        //                     SigL#[X]=True; end;
        //                  If SigL#[X][1] and 
        //                      MPL#[X]=0 and ThisBar[1]-
        //                  SigBarL#[X][1]<=1 and Low<=LoBand20[1]-OneTick then begin 
        //                     SigL#[X]=false; If Close[1]>=LoBand20[1] then begin
        //              EntryLevelL#[X]=LoBand20[1]-OneTick; end; If Close[1]<LoBand20[1] then begin
        //              EntryLevelL#[X]=Open; end;
        //                      MPL#[X]=-1; end;
        //                If Exit2L#[X] and 
        //                      MPL#[X]=-1 and 
        //                      MPL#[X][1]=-1 and High>=XMA13[1]+OneTick then begin
        //                      MPL#[X]=0;
        //          LTradeNetProfit#[X]=
        //              EntryLevelL#[X]-(XMA13[1]+OneTick);
        //                   Exit2L#[X]=false;
        //              EntryLevelL#[X]=0; end;
        //     If SafetyX=1 and MPL#[X]=-1 and 
        //                      MPL#[X][1]=-1 and Low<XDLoBand[1] and XDLoBand[1]<
        //              EntryLevelL#[X] then begin
        //                   Exit2L#[X]=True; end;
        //               If TExit2L#[X] and 
        //                      MPL#[X]=-1 and 
        //                      MPL#[X][1]=-1 and Low<=XMA13[1] then begin
        //                      MPL#[X]=0;
        //          LTradeNetProfit#[X]=
        //              EntryLevelL#[X]-(XMA13[1]+OneTick);
        //                  TExit2L#[X]=false;
        //              EntryLevelL#[X]=0; end;
        //      If TExit2=1 and MPL#[X]=-1 and 
        //                      MPL#[X][1]=-1 and High>TX2HiBand20[1] and TX2HiBand20[1]>
        //              EntryLevelL#[X] then begin
        //                  TExit2L#[X]=True; end;
        //                  If (MPL#[X]=-1 and Time>=TooLate) or (ExitonFriday=1 and dayofweek(date)=5) then begin 
        //                      MPL#[X]=0;
        //          LTradeNetProfit#[X]=Close-
        //              EntryLevelL#[X];
        //              EntryLevelL#[X]=0; end; 
        //                   If MPL#[X][1]=-1 and 
        //                      MPL#[X]<>-1 then begin
        //              CumProfitsL#[X]=
        //              CumProfitsL#[X]+
        //          LTradeNetProfit#[X];
        //                   Exit2L#[X]=false;
        //                  TExit2L#[X]=false; end; If Date<>Date[1] and DailyBarCounter[1]>MinDailyBars then begin
        //              CumProfitsL#[X]=0; end;

        // {&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&}


        //                   If MPS#[X]=1 and High>=
        //              EntryLevelS#[X]+(StopLossConversion-OneTick) then begin
        //                      MPS#[X]=0;
        //          STradeNetProfit#[X]=(StopLossConversion-OneTick);
        //              EntryLevelS#[X]=0; end;
        //                   If MPS#[X]=1 and Low<=TLoBand20[1]-OneTick then begin
        //                      MPS#[X]=0;
        //          STradeNetProfit#[X]=(TLoBand20[1]-OneTick)-
        //              EntryLevelS#[X];
        //              EntryLevelS#[X]=0; end; 
        //                   If MPS#[X]=1 or ThisBar-
        //                  SigBarS#[X]>=1 then begin
        //                     SigS#[X]=false; end;
        //                   If MPS#[X]<>1 and Peak1 and ThisBar-SigBarPH<=Spacing and ThisBar-SigBarPH>=StartSpacing and NTH1 and DontTradeToday=false and Time<TooLateEntry and VMinDays and 
        //              DontGoShort#[X]=false and 
        //                PVFilterS#[X] and 
        //                    PushS#[X] and (BF0 or BF1S or BF2S) and
        //                 MomComboS[X] then begin
        //                  SigBarS#[X]=ThisBar;
        //                     SigS#[X]=True; end;
        //                  If SigS#[X][1] and 
        //                      MPS#[X]=0 and ThisBar[1]-
        //                  SigBarS#[X][1]<=1 and High>=HiBand20[1]+OneTick then begin 
        //                     SigS#[X]=false; If Close[1]<=HiBand20[1] then begin
        //              EntryLevelS#[X]=HiBand20[1]+OneTick; end; If Close[1]>HiBand20[1] then begin
        //              EntryLevelS#[X]=Open; end;
        //                      MPS#[X]=1; end;
        //                If Exit2S#[X] and 
        //                      MPS#[X]=1 and 
        //                      MPS#[X][1]=1 and Low<=XMA13[1]-OneTick then begin
        //                      MPS#[X]=0;
        //          STradeNetProfit#[X]=(XMA13[1]-OneTick)-
        //              EntryLevelS#[X];
        //                   Exit2S#[X]=false;
        //              EntryLevelS#[X]=0; end;
        //     If SafetyX=1 and MPS#[X]=1 and 
        //                      MPS#[X][1]=1 and High>XDHiBand[1] and XDHiBand[1]>
        //              EntryLevelS#[X] then begin
        //                   Exit2S#[X]=True; end;
        //               If TExit2S#[X] and 
        //                      MPS#[X]=1 and 
        //                      MPS#[X][1]=1 and High>=XMA13[1] then begin
        //                      MPS#[X]=0;
        //          STradeNetProfit#[X]=(XMA13[1]-OneTick)-
        //              EntryLevelS#[X];
        //                  TExit2S#[X]=false;
        //              EntryLevelS#[X]=0; end;
        //      If TExit2=1 and MPS#[X]=1 and 
        //                      MPS#[X][1]=1 and Low<TX2LoBand20[1] and TX2LoBand20[1]<
        //              EntryLevelS#[X] then begin
        //                  TExit2S#[X]=True; end;
        //                  If (MPS#[X]=1 and Time>=TooLate) or (ExitonFriday=1 and dayofweek(date)=5) then begin 
        //                      MPS#[X]=0;
        //          STradeNetProfit#[X]=
        //              EntryLevelS#[X]-Close;
        //              EntryLevelS#[X]=0; end;
        //                   If MPS#[X][1]=1 and 
        //                      MPS#[X]<>1 then begin
        //              CumProfitsS#[X]=
        //              CumProfitsS#[X]+
        //          STradeNetProfit#[X];
        //                   Exit2S#[X]=false;
        //                  TExit2S#[X]=false; end; If Date<>Date[1] and DailyBarCounter[1]>MinDailyBars then begin
        //              CumProfitsS#[X]=0; end; 


        // end;
        // end;
        // end;

        // {XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX}
        // {XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX}
        // {XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX}


        // If EntryType=1 or EntryType=3 then begin
        // If VStratType=3 then begin
        // For X=1 to Size begin




        //                   If MPL#[X]=-1 and High>=
        //              EntryLevelL#[X]+StopLossConversion then begin
        //                      MPL#[X]=0;
        //          LTradeNetProfit#[X]=-StopLossConversion;
        //              EntryLevelL#[X]=0; end;
        //                   If MPL#[X]=-1 and Low<=TLoBand20[1]-OneTick then begin
        //                      MPL#[X]=0;
        //          LTradeNetProfit#[X]=
        //              EntryLevelL#[X]-TLoBand20[1];
        //              EntryLevelL#[X]=0; end;
        //                   If MPL#[X]=-1 or ThisBar-
        //                  SigBarL#[X]>=1 then begin
        //                     SigL#[X]=false; end;
        //                   If MPL#[X]<>-1 and Valley1 and ThisBar-SigBarVL<=Spacing and ThisBar-SigBarVL>=StartSpacing and NTL1 and DontTradeToday=false and Time<TooLateEntry and VMinDays and  
        //               DontGoLong#[X]=false and
        //                PVFilterL#[X] and
        //                    PushL#[X] and (BF0 or BF1L or BF2L) and
        //                 MomComboL[X] then begin
        //                  SigBarL#[X]=ThisBar;
        //                     SigL#[X]=True; end;
        //                  If SigL#[X][1] and 
        //                      MPL#[X]=0 and ThisBar[1]-
        //                  SigBarL#[X][1]<=1 and Low<=LoBand20[1] then begin 
        //                     SigL#[X]=false; If Close[1]>=LoBand20[1] then begin
        //              EntryLevelL#[X]=LoBand20[1]; end; If Close[1]<LoBand20[1] then begin
        //              EntryLevelL#[X]=Open; end;
        //                      MPL#[X]=-1; end;
        //                If Exit2L#[X] and 
        //                      MPL#[X]=-1 and 
        //                      MPL#[X][1]=-1 and Low<=LoBand20[1]-OneTick then begin
        //                      MPL#[X]=0;
        //          LTradeNetProfit#[X]=
        //              EntryLevelL#[X]-LoBand20[1];
        //                   Exit2L#[X]=false;
        //              EntryLevelL#[X]=0; end;
        //     If SafetyX=1 and MPL#[X]=-1 and 
        //                      MPL#[X][1]=-1 and High>XDHiBand[1] and XDHiBand[1]>
        //              EntryLevelL#[X] then begin
        //                   Exit2L#[X]=True; end;
        //               If TExit2L#[X] and 
        //                      MPL#[X]=-1 and 
        //                      MPL#[X][1]=-1 and High>=LoBand20[1] then begin
        //                      MPL#[X]=0;
        //          LTradeNetProfit#[X]=
        //              EntryLevelL#[X]-LoBand20[1];
        //                  TExit2L#[X]=false;
        //              EntryLevelL#[X]=0; end;
        //      If TExit2=1 and MPL#[X]=-1 and 
        //                      MPL#[X][1]=-1 and Low<TX2LoBand20[1] and TX2LoBand20[1]<
        //              EntryLevelL#[X] then begin
        //                  TExit2L#[X]=True; end;
        //                  If (MPL#[X]=-1 and Time>=TooLate) or (ExitonFriday=1 and dayofweek(date)=5) then begin 
        //                      MPL#[X]=0;
        //          LTradeNetProfit#[X]=
        //              EntryLevelL#[X]-Close;
        //              EntryLevelL#[X]=0; end; 
        //                   If MPL#[X][1]=-1 and 
        //                      MPL#[X]<>-1 then begin
        //              CumProfitsL#[X]=
        //              CumProfitsL#[X]+
        //          LTradeNetProfit#[X];
        //                   Exit2L#[X]=false;
        //                  TExit2L#[X]=false; end; If Date<>Date[1] and DailyBarCounter[1]>MinDailyBars then begin
        //              CumProfitsL#[X]=0; end;

        // {&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&}



        //                   If MPS#[X]=1 and Low<=
        //              EntryLevelS#[X]-StopLossConversion then begin
        //                      MPS#[X]=0;
        //          STradeNetProfit#[X]=-StopLossConversion;
        //              EntryLevelS#[X]=0; end;
        //                   If MPS#[X]=1 and High>=THiBand20[1]+OneTick then begin
        //                      MPS#[X]=0;
        //          STradeNetProfit#[X]=THiBand20[1]-
        //              EntryLevelS#[X];
        //              EntryLevelS#[X]=0; end;
        //                   If MPS#[X]=1 or ThisBar-
        //                  SigBarS#[X]>=1 then begin
        //                     SigS#[X]=false; end;
        //                   If MPS#[X]<>1 and Peak1 and ThisBar-SigBarPH<=Spacing and ThisBar-SigBarPH>=StartSpacing and NTH1 and DontTradeToday=false and Time<TooLateEntry and VMindays and 
        //              DontGoShort#[X]=false and
        //                PVFilterS#[X] and
        //                    PushS#[X] and (BF0 or BF1S or BF2S) and
        //                 MomComboS[X] then begin
        //                  SigBarS#[X]=ThisBar;
        //                     SigS#[X]=True; end;
        //                  If SigS#[X][1] and 
        //                      MPS#[X]=0 and ThisBar[1]-
        //                  SigBarS#[X][1]<=1 and High>=HiBand20[1] then begin 
        //                     SigS#[X]=false; If Close[1]<=HiBand20[1] then begin
        //              EntryLevelS#[X]=HiBand20[1]; end; If Close[1]>HiBand20[1] then begin
        //              EntryLevelS#[X]=Open; end;
        //                      MPS#[X]=1; end;
        //                If Exit2S#[X] and 
        //                      MPS#[X]=1 and 
        //                      MPS#[X][1]=1 and High>=HiBand20[1]+OneTick then begin
        //                      MPS#[X]=0;
        //          STradeNetProfit#[X]=HiBand20[1]-
        //              EntryLevelS#[X];
        //                   Exit2S#[X]=false;
        //              EntryLevelS#[X]=0; end;
        //     If SafetyX=1 and MPS#[X]=1 and 
        //                      MPS#[X][1]=1 and Low<XDLoBand[1] and XDLoBand[1]<
        //              EntryLevelS#[X] then begin
        //                   Exit2S#[X]=True; end;
        //               If TExit2S#[X] and 
        //                      MPS#[X]=1 and 
        //                      MPS#[X][1]=1 and Low<=HiBand20[1] then begin
        //                      MPS#[X]=0;
        //          STradeNetProfit#[X]=HiBand20[1]-
        //              EntryLevelS#[X];
        //                  TExit2S#[X]=false;
        //              EntryLevelS#[X]=0; end;
        //      If TExit2=1 and MPS#[X]=1 and 
        //                      MPS#[X][1]=1 and High>TX2HiBand20[1] and TX2HiBand20[1]>
        //              EntryLevelS#[X] then begin
        //                  TExit2S#[X]=True; end;
        //                  If (MPS#[X]=1 and Time>=TooLate) or (ExitonFriday=1 and dayofweek(date)=5) then begin 
        //                      MPS#[X]=0;
        //          STradeNetProfit#[X]=Close-
        //              EntryLevelS#[X];
        //              EntryLevelS#[X]=0; end;
        //                   If MPS#[X][1]=1 and 
        //                      MPS#[X]<>1 then begin
        //              CumProfitsS#[X]=
        //              CumProfitsS#[X]+
        //          STradeNetProfit#[X];
        //                   Exit2S#[X]=false;
        //                  TExit2S#[X]=false; end; If Date<>Date[1] and DailyBarCounter[1]>MinDailyBars then begin
        //              CumProfitsS#[X]=0; end; 

        // end;
        // end;
        // end;



        // {XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX}
        // {XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX}
        // {XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX}


        // If EntryType=2 then begin
        // If VStratType=1 then begin
        // For X=1 to Size begin




        //                   If MPL#[X]=-1 and High>=
        //              EntryLevelL#[X]+StopLossConversion then begin
        //                      MPL#[X]=0;
        //          LTradeNetProfit#[X]=-StopLossConversion;
        //              EntryLevelL#[X]=0; end;
        //                   If MPL#[X]=-1 and Low<=TLoBand20[1]-OneTick then begin
        //                      MPL#[X]=0;
        //          LTradeNetProfit#[X]=
        //              EntryLevelL#[X]-TLoBand20[1];
        //              EntryLevelL#[X]=0; end;
        //                   If MPL#[X]=-1 or ThisBar-
        //                  SigBarL#[X]>=1 then begin
        //                     SigL#[X]=false; end;
        //                   If MPL#[X]<>-1 and Valley1 and ThisBar-SigBarVL<=Spacing and ThisBar-SigBarVL>=StartSpacing and NTL1 and DontTradeToday=false and Time<TooLateEntry and VMinDays and  
        //               DontGoLong#[X]=false and
        //                PVFilterL#[X] and
        //                    PushL#[X] and (BF0 or BF1L or BF2L) and
        //                 MomComboL[X] then begin
        //                  SigBarL#[X]=ThisBar;
        //                     SigL#[X]=True; end;
        //                  If SigL#[X][1] and 
        //                      MPL#[X]=0 and ThisBar[1]-
        //                  SigBarL#[X][1]<=1 and Low<=LoBand20[1] then begin 
        //                     SigL#[X]=false; If Close[1]>=LoBand20[1] then begin
        //              EntryLevelL#[X]=LoBand20[1]; end; If Close[1]<LoBand20[1] then begin
        //              EntryLevelL#[X]=Open; end;
        //                      MPL#[X]=-1; end;
        //                If Exit2L#[X] and 
        //                      MPL#[X]=-1 and 
        //                      MPL#[X][1]=-1 and Low<=LoBand20[1]-OneTick then begin
        //                      MPL#[X]=0;
        //          LTradeNetProfit#[X]=
        //              EntryLevelL#[X]-LoBand20[1];
        //                   Exit2L#[X]=false;
        //              EntryLevelL#[X]=0; end;
        //     If SafetyX=1 and MPL#[X]=-1 and 
        //                      MPL#[X][1]=-1 and High>XDHiBand[1] and XDHiBand[1]>
        //              EntryLevelL#[X] then begin
        //                   Exit2L#[X]=True; end;
        //               If TExit2L#[X] and 
        //                      MPL#[X]=-1 and 
        //                      MPL#[X][1]=-1 and High>=LoBand20[1] then begin
        //                      MPL#[X]=0;
        //          LTradeNetProfit#[X]=
        //              EntryLevelL#[X]-LoBand20[1];
        //                  TExit2L#[X]=false;
        //              EntryLevelL#[X]=0; end;
        //      If TExit2=1 and MPL#[X]=-1 and 
        //                      MPL#[X][1]=-1 and Low<TX2LoBand20[1] and TX2LoBand20[1]<
        //              EntryLevelL#[X] then begin
        //                  TExit2L#[X]=True; end;
        //                  If (MPL#[X]=-1 and Time>=TooLate) or (ExitonFriday=1 and dayofweek(date)=5) then begin 
        //                      MPL#[X]=0;
        //          LTradeNetProfit#[X]=
        //              EntryLevelL#[X]-Close;
        //              EntryLevelL#[X]=0; end; 
        //                   If MPL#[X][1]=-1 and 
        //                      MPL#[X]<>-1 then begin
        //              CumProfitsL#[X]=
        //              CumProfitsL#[X]+
        //          LTradeNetProfit#[X];
        //                   Exit2L#[X]=false;
        //                  TExit2L#[X]=false; end; If Date<>Date[1] and DailyBarCounter[1]>MinDailyBars then begin
        //              CumProfitsL#[X]=0; end;

        // {&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&}



        //                   If MPS#[X]=1 and Low<=
        //              EntryLevelS#[X]-StopLossConversion then begin
        //                      MPS#[X]=0;
        //          STradeNetProfit#[X]=-StopLossConversion;
        //              EntryLevelS#[X]=0; end;
        //                   If MPS#[X]=1 and High>=THiBand20[1]+OneTick then begin
        //                      MPS#[X]=0;
        //          STradeNetProfit#[X]=THiBand20[1]-
        //              EntryLevelS#[X];
        //              EntryLevelS#[X]=0; end;
        //                   If MPS#[X]=1 or ThisBar-
        //                  SigBarS#[X]>=1 then begin
        //                     SigS#[X]=false; end;
        //                   If MPS#[X]<>1 and Peak1 and ThisBar-SigBarPH<=Spacing and ThisBar-SigBarPH>=StartSpacing and NTH1 and DontTradeToday=false and Time<TooLateEntry and VMindays and 
        //              DontGoShort#[X]=false and
        //                PVFilterS#[X] and
        //                    PushS#[X] and (BF0 or BF1S or BF2S) and
        //                 MomComboS[X] then begin
        //                  SigBarS#[X]=ThisBar;
        //                     SigS#[X]=True; end;
        //                  If SigS#[X][1] and 
        //                      MPS#[X]=0 and ThisBar[1]-
        //                  SigBarS#[X][1]<=1 and High>=HiBand20[1] then begin 
        //                     SigS#[X]=false; If Close[1]<=HiBand20[1] then begin
        //              EntryLevelS#[X]=HiBand20[1]; end; If Close[1]>HiBand20[1] then begin
        //              EntryLevelS#[X]=Open; end;
        //                      MPS#[X]=1; end;
        //                If Exit2S#[X] and 
        //                      MPS#[X]=1 and 
        //                      MPS#[X][1]=1 and High>=HiBand20[1]+OneTick then begin
        //                      MPS#[X]=0;
        //          STradeNetProfit#[X]=HiBand20[1]-
        //              EntryLevelS#[X];
        //                   Exit2S#[X]=false;
        //              EntryLevelS#[X]=0; end;
        //     If SafetyX=1 and MPS#[X]=1 and 
        //                      MPS#[X][1]=1 and Low<XDLoBand[1] and XDLoBand[1]<
        //              EntryLevelS#[X] then begin
        //                   Exit2S#[X]=True; end;
        //               If TExit2S#[X] and 
        //                      MPS#[X]=1 and 
        //                      MPS#[X][1]=1 and Low<=HiBand20[1] then begin
        //                      MPS#[X]=0;
        //          STradeNetProfit#[X]=HiBand20[1]-
        //              EntryLevelS#[X];
        //                  TExit2S#[X]=false;
        //              EntryLevelS#[X]=0; end;
        //      If TExit2=1 and MPS#[X]=1 and 
        //                      MPS#[X][1]=1 and High>TX2HiBand20[1] and TX2HiBand20[1]>
        //              EntryLevelS#[X] then begin
        //                  TExit2S#[X]=True; end;
        //                  If (MPS#[X]=1 and Time>=TooLate) or (ExitonFriday=1 and dayofweek(date)=5) then begin 
        //                      MPS#[X]=0;
        //          STradeNetProfit#[X]=Close-
        //              EntryLevelS#[X];
        //              EntryLevelS#[X]=0; end;
        //                   If MPS#[X][1]=1 and 
        //                      MPS#[X]<>1 then begin
        //              CumProfitsS#[X]=
        //              CumProfitsS#[X]+
        //          STradeNetProfit#[X];
        //                   Exit2S#[X]=false;
        //                  TExit2S#[X]=false; end; If Date<>Date[1] and DailyBarCounter[1]>MinDailyBars then begin
        //              CumProfitsS#[X]=0; end; 

        // end;
        // end;
        // end;


        // {XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX}
        // {XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX}
        // {XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX}


        // If EntryType=2 then begin
        // If VStratType=2 then begin
        // For X=1 to Size begin




        //                   If MPL#[X]=1 and High>=
        //              EntryLevelL#[X]+(StopLossConversion-OneTick) then begin
        //                      MPL#[X]=0;
        //          LTradeNetProfit#[X]=(StopLossConversion-OneTick);
        //              EntryLevelL#[X]=0; end;
        //                   If MPL#[X]=1 and Low<=TLoBand20[1]-OneTick then begin
        //                      MPL#[X]=0;
        //          LTradeNetProfit#[X]=(TLoBand20[1]-OneTick)-
        //              EntryLevelL#[X];
        //              EntryLevelL#[X]=0; end;
        //                   If MPL#[X]=1 or ThisBar-
        //                  SigBarL#[X]>=1 then begin
        //                     SigL#[X]=false; end;
        //                   If MPL#[X]<>1 and Valley1 and ThisBar-SigBarVL<=Spacing and ThisBar-SigBarVL>=StartSpacing and NTL1 and DontTradeToday=false and Time<TooLateEntry and VMinDays and  
        //               DontGoLong#[X]=false and
        //                PVFilterL#[X] and
        //                    PushL#[X] and (BF0 or BF1L or BF2L) and
        //                 MomComboL[X] then begin
        //                  SigBarL#[X]=ThisBar;
        //                     SigL#[X]=True; end;
        //                  If SigL#[X][1] and 
        //                      MPL#[X]=0 and ThisBar[1]-
        //                  SigBarL#[X][1]<=1 and Low<=LoBand20[1] then begin 
        //                     SigL#[X]=false; If Close[1]>=LoBand20[1] then begin
        //              EntryLevelL#[X]=LoBand20[1]+OneTick; end; If Close[1]<LoBand20[1] then begin
        //              EntryLevelL#[X]=Open; end;
        //                      MPL#[X]=1; end;
        //                If Exit2L#[X] and 
        //                      MPL#[X]=1 and 
        //                      MPL#[X][1]=1 and Low<=LoBand20[1]-OneTick then begin
        //                      MPL#[X]=0;
        //          LTradeNetProfit#[X]=(LoBand20[1]-OneTick)-
        //              EntryLevelL#[X];
        //                   Exit2L#[X]=false;
        //              EntryLevelL#[X]=0; end;
        //     If SafetyX=1 and MPL#[X]=1 and 
        //                      MPL#[X][1]=1 and High>XDHiBand[1] and XDHiBand[1]>
        //              EntryLevelL#[X] then begin
        //                   Exit2L#[X]=True; end;
        //               If TExit2L#[X] and 
        //                      MPL#[X]=1 and 
        //                      MPL#[X][1]=1 and High>=LoBand20[1] then begin
        //                      MPL#[X]=0;
        //          LTradeNetProfit#[X]=(LoBand20[1]-OneTick)-
        //              EntryLevelL#[X];
        //                  TExit2L#[X]=false;
        //              EntryLevelL#[X]=0; end;
        //      If TExit2=1 and MPL#[X]=1 and 
        //                      MPL#[X][1]=1 and Low<TX2LoBand20[1] and TX2LoBand20[1]<
        //              EntryLevelL#[X] then begin
        //                  TExit2L#[X]=True; end;
        //                  If (MPL#[X]=1 and Time>=TooLate) or (ExitonFriday=1 and dayofweek(date)=5) then begin 
        //                      MPL#[X]=0;
        //          LTradeNetProfit#[X]=Close-
        //              EntryLevelL#[X];
        //              EntryLevelL#[X]=0; end; 
        //                   If MPL#[X][1]=1 and 
        //                      MPL#[X]<>1 then begin
        //              CumProfitsL#[X]=
        //              CumProfitsL#[X]+
        //          LTradeNetProfit#[X];
        //                   Exit2L#[X]=false;
        //                  TExit2L#[X]=false; end; If Date<>Date[1] and DailyBarCounter[1]>MinDailyBars then begin
        //              CumProfitsL#[X]=0; end;

        // {&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&}



        //                   If MPS#[X]=-1 and Low<=
        //              EntryLevelS#[X]-(StopLossConversion-OneTick) then begin
        //                      MPS#[X]=0;
        //          STradeNetProfit#[X]=StopLossConversion-OneTick;
        //              EntryLevelS#[X]=0; end;
        //                   If MPS#[X]=-1 and High>=THiBand20[1]+OneTick then begin
        //                      MPS#[X]=0;
        //          STradeNetProfit#[X]=
        //              EntryLevelS#[X]-(THiBand20[1]+OneTick);
        //              EntryLevelS#[X]=0; end;
        //                   If MPS#[X]=-1 or ThisBar-
        //                  SigBarS#[X]>=1 then begin
        //                     SigS#[X]=false; end;
        //                   If MPS#[X]<>-1 and Peak1 and ThisBar-SigBarPH<=Spacing and ThisBar-SigBarPH>=StartSpacing and NTH1 and DontTradeToday=false and Time<TooLateEntry and VMindays and 
        //              DontGoShort#[X]=false and
        //                PVFilterS#[X] and
        //                    PushS#[X] and (BF0 or BF1S or BF2S) and
        //                 MomComboS[X] then begin
        //                  SigBarS#[X]=ThisBar;
        //                     SigS#[X]=True; end;
        //                  If SigS#[X][1] and 
        //                      MPS#[X]=0 and ThisBar[1]-
        //                  SigBarS#[X][1]<=1 and High>=HiBand20[1] then begin 
        //                     SigS#[X]=false; If Close[1]<=HiBand20[1] then begin
        //              EntryLevelS#[X]=HiBand20[1]-OneTick; end; If Close[1]>HiBand20[1] then begin
        //              EntryLevelS#[X]=Open; end;
        //                      MPS#[X]=-1; end;
        //                If Exit2S#[X] and 
        //                      MPS#[X]=-1 and 
        //                      MPS#[X][1]=-1 and High>=HiBand20[1]+OneTick then begin
        //                      MPS#[X]=0;
        //          STradeNetProfit#[X]=
        //              EntryLevelS#[X]-(HiBand20[1]+OneTick);
        //                   Exit2S#[X]=false;
        //              EntryLevelS#[X]=0; end;
        //     If SafetyX=1 and MPS#[X]=-1 and 
        //                      MPS#[X][1]=-1 and Low<XDLoBand[1] and XDLoBand[1]<
        //              EntryLevelS#[X] then begin
        //                   Exit2S#[X]=True; end;
        //               If TExit2S#[X] and 
        //                      MPS#[X]=-1 and 
        //                      MPS#[X][1]=-1 and Low<=HiBand20[1] then begin
        //                      MPS#[X]=0;
        //          STradeNetProfit#[X]=
        //              EntryLevelS#[X]-(HiBand20[1]+OneTick);
        //                  TExit2S#[X]=false;
        //              EntryLevelS#[X]=0; end;
        //      If TExit2=1 and MPS#[X]=-1 and 
        //                      MPS#[X][1]=-1 and High>TX2HiBand20[1] and TX2HiBand20[1]>
        //              EntryLevelS#[X] then begin
        //                  TExit2S#[X]=True; end;
        //                  If (MPS#[X]=1 and Time>=TooLate) or (ExitonFriday=1 and dayofweek(date)=5) then begin 
        //                      MPS#[X]=0;
        //          STradeNetProfit#[X]=
        //              EntryLevelS#[X]-Close;
        //              EntryLevelS#[X]=0; end;
        //                   If MPS#[X][1]=-1 and 
        //                      MPS#[X]<>-1 then begin
        //              CumProfitsS#[X]=
        //              CumProfitsS#[X]+
        //          STradeNetProfit#[X];
        //                   Exit2S#[X]=false;
        //                  TExit2S#[X]=false; end; If Date<>Date[1] and DailyBarCounter[1]>MinDailyBars then begin
        //              CumProfitsS#[X]=0; end; 

        // end;
        // end;
        // end;


        // {TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT}
        // {%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%}



        // If EntryType=2 then begin
        // If VStratType=3 then begin
        // For X=1 to Size begin

        //                   If MPL#[X]=1 and Low<=
        //              EntryLevelL#[X]-StopLossConversion then begin
        //                      MPL#[X]=0; 
        //          LTradeNetProfit#[X]=-StopLossConversion;
        //              EntryLevelL#[X]=0; end;
        //                   If MPL#[X]=1 and High>=THiBand20[1]+OneTick then begin
        //                      MPL#[X]=0;
        //          LTradeNetProfit#[X]=THiBand20[1]-
        //              EntryLevelL#[X];
        //              EntryLevelL#[X]=0; end;                   
        //                   If MPL#[X]=1 or ThisBar-
        //                  SigBarL#[X]>=1 then begin
        //                     SigL#[X]=false; end;
        //                   If MPL#[X]<>1 and Valley1 and ThisBar-SigBarVL<=Spacing and ThisBar-SigBarVL>=StartSpacing and NTL1 and DontTradeToday=false and Time<TooLateEntry and VMinDays and 
        //               DontGoLong#[X]=false and
        //                PVFilterL#[X] and
        //                    PushL#[X] and (BF0 or BF1L or BF2L) and
        //                 MomComboL[X] then begin
        //                  SigBarL#[X]=ThisBar;
        //                     SigL#[X]=True; end;
        //                  If SigL#[X][1] and 
        //                      MPL#[X]=0 and ThisBar[1]-
        //                  SigBarL#[X][1]<=1 and Low<=LoBand20[1]-OneTick then begin 
        //                     SigL#[X]=false; If Close[1]>=LoBand20[1] then begin
        //              EntryLevelL#[X]=LoBand20[1]; end; If Close[1]<LoBand20[1] then begin
        //              EntryLevelL#[X]=Open; end;
        //                      MPL#[X]=1; end;
        //                If Exit2L#[X] and 
        //                      MPL#[X]=1 and 
        //                      MPL#[X][1]=1 and High>=XMA13[1]+OneTick then begin
        //                      MPL#[X]=0;
        //          LTradeNetProfit#[X]=XMA13[1]-
        //              EntryLevelL#[X];
        //                   Exit2L#[X]=false;
        //              EntryLevelL#[X]=0; end;
        //     If SafetyX=1 and MPL#[X]=1 and 
        //                      MPL#[X][1]=1 and Low<XDLoBand[1] and XDLoBand[1]<
        //              EntryLevelL#[X] then begin
        //                   Exit2L#[X]=True; end;
        //               If TExit2L#[X] and 
        //                      MPL#[X]=1 and 
        //                      MPL#[X][1]=1 and Low<=XMA13[1] then begin
        //                      MPL#[X]=0;
        //          LTradeNetProfit#[X]=XMA13[1]-
        //              EntryLevelL#[X];
        //                  TExit2L#[X]=false;
        //              EntryLevelL#[X]=0; end;
        //      If TExit2=1 and MPL#[X]=1 and 
        //                      MPL#[X][1]=1 and High>TX2HiBand20[1] and TX2HiBand20[1]>
        //              EntryLevelL#[X] then begin
        //                  TExit2L#[X]=True; end;
        //                  If (MPL#[X]=1 and Time>=TooLate) or (ExitonFriday=1 and dayofweek(date)=5) then begin 
        //                      MPL#[X]=0;
        //          LTradeNetProfit#[X]=Close-
        //              EntryLevelL#[X];
        //              EntryLevelL#[X]=0; end; 
        //                   If MPL#[X][1]=1 and 
        //                      MPL#[X]<>1 then begin
        //              CumProfitsL#[X]=
        //              CumProfitsL#[X]+
        //          LTradeNetProfit#[X];
        //                   Exit2L#[X]=false;
        //                  TExit2L#[X]=false; end; If Date<>Date[1] and DailyBarCounter[1]>MinDailyBars then begin
        //              CumProfitsL#[X]=0; end;

        // {&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&}


        //                   If MPS#[X]=-1 and High>=
        //              EntryLevelS#[X]+StopLossConversion then begin
        //                      MPS#[X]=0;
        //          STradeNetProfit#[X]=-StopLossConversion;
        //              EntryLevelS#[X]=0; end;
        //                   If MPS#[X]=-1 and Low<=TLoBand20[1]-OneTick then begin
        //                      MPS#[X]=0;
        //          STradeNetProfit#[X]=
        //              EntryLevelS#[X]-TLoBand20[1];
        //              EntryLevelS#[X]=0; end; 
        //                   If MPS#[X]=-1 or ThisBar-
        //                  SigBarS#[X]>=1 then begin
        //                     SigS#[X]=false; end;
        //                   If MPS#[X]<>-1 and Peak1 and ThisBar-SigBarPH<=Spacing and ThisBar-SigBarPH>=StartSpacing and NTH1 and DontTradeToday=false and Time<TooLateEntry and VMinDays and 
        //              DontGoShort#[X]=false and
        //                PVFilterS#[X] and 
        //                    PushS#[X] and (BF0 or BF1S or BF2S) and
        //                 MomComboS[X] then begin
        //                  SigBarS#[X]=ThisBar;
        //                     SigS#[X]=True; end;
        //                  If SigS#[X][1] and 
        //                      MPS#[X]=0 and ThisBar[1]-
        //                  SigBarS#[X][1]<=1 and High>=HiBand20[1]+OneTick then begin 
        //                     SigS#[X]=false; If Close[1]<=HiBand20[1] then begin
        //              EntryLevelS#[X]=HiBand20[1]; end; If Close[1]>HiBand20[1] then begin
        //              EntryLevelS#[X]=Open; end;
        //                      MPS#[X]=-1; end;
        //                If Exit2S#[X] and 
        //                      MPS#[X]=-1 and 
        //                      MPS#[X][1]=-1 and Low<=XMA13[1]-OneTick then begin
        //                      MPS#[X]=0;
        //          STradeNetProfit#[X]=
        //              EntryLevelS#[X]-XMA13[1];
        //                   Exit2S#[X]=false;
        //              EntryLevelS#[X]=0; end;
        //     If SafetyX=1 and MPS#[X]=-1 and 
        //                      MPS#[X][1]=-1 and High>XDHiBand[1] and XDHiBand[1]>
        //              EntryLevelS#[X] then begin
        //                   Exit2S#[X]=True; end;
        //               If TExit2S#[X] and 
        //                      MPS#[X]=-1 and 
        //                      MPS#[X][1]=-1 and High>=XMA13[1] then begin
        //                      MPS#[X]=0;
        //          STradeNetProfit#[X]=
        //              EntryLevelS#[X]-XMA13[1];
        //                  TExit2S#[X]=false;
        //              EntryLevelS#[X]=0; end;
        //      If TExit2=1 and MPS#[X]=-1 and 
        //                      MPS#[X][1]=-1 and Low<TX2LoBand20[1] and TX2LoBand20[1]<
        //              EntryLevelS#[X] then begin
        //                  TExit2S#[X]=True; end;
        //                  If (MPS#[X]=-1 and Time>=TooLate) or (ExitonFriday=1 and dayofweek(date)=5) then begin 
        //                      MPS#[X]=0;
        //          STradeNetProfit#[X]=
        //              EntryLevelS#[X]-Close;
        //              EntryLevelS#[X]=0; end;
        //                   If MPS#[X][1]=-1 and 
        //                      MPS#[X]<>-1 then begin
        //              CumProfitsS#[X]=
        //              CumProfitsS#[X]+
        //          STradeNetProfit#[X];
        //                   Exit2S#[X]=false;
        //                  TExit2S#[X]=false; end; If Date<>Date[1] and DailyBarCounter[1]>MinDailyBars then begin
        //              CumProfitsS#[X]=0; end; 


        // end;
        // end;
        // end;


        // If Date<>Date[1] and DailyBarCounter[1]>MinDailyBars then begin
        // For X=1 to Size begin
        // CumProfitsL1#[X]=CumProfitsL#[X][1];
        // CumProfitsS1#[X]=CumProfitsS#[X][1];
        // CumProfitsL2#[X]=CumProfitsL1#[X][1]+CumProfitsL#[X][1]; 
        // CumProfitsS2#[X]=CumProfitsS1#[X][1]+CumProfitsS#[X][1];
        // CumProfitsL3#[X]=CumProfitsL2#[X][1]+CumProfitsL#[X][1]; 
        // CumProfitsS3#[X]=CumProfitsS2#[X][1]+CumProfitsS#[X][1];
        // CumProfitsL4#[X]=CumProfitsL3#[X][1]+CumProfitsL#[X][1]; 
        // CumProfitsS4#[X]=CumProfitsS3#[X][1]+CumProfitsS#[X][1];
        // CumProfitsL5#[X]=CumProfitsL4#[X][1]+CumProfitsL#[X][1]; 
        // CumProfitsS5#[X]=CumProfitsS4#[X][1]+CumProfitsS#[X][1];
        // CumProfitsL6#[X]=CumProfitsL5#[X][1]+CumProfitsL#[X][1]; 
        // CumProfitsS6#[X]=CumProfitsS5#[X][1]+CumProfitsS#[X][1];
        // CumProfitsL7#[X]=CumProfitsL6#[X][1]+CumProfitsL#[X][1]; 
        // CumProfitsS7#[X]=CumProfitsS6#[X][1]+CumProfitsS#[X][1];
        // CumProfitsL8#[X]=CumProfitsL7#[X][1]+CumProfitsL#[X][1]; 
        // CumProfitsS8#[X]=CumProfitsS7#[X][1]+CumProfitsS#[X][1];
        // CumProfitsL9#[X]=CumProfitsL8#[X][1]+CumProfitsL#[X][1]; 
        // CumProfitsS9#[X]=CumProfitsS8#[X][1]+CumProfitsS#[X][1];
        // CumProfitsL10#[X]=CumProfitsL9#[X][1]+CumProfitsL#[X][1]; 
        // CumProfitsS10#[X]=CumProfitsS9#[X][1]+CumProfitsS#[X][1];
        // CumProfitsL11#[X]=CumProfitsL10#[X][1]+CumProfitsL#[X][1]; 
        // CumProfitsS11#[X]=CumProfitsS10#[X][1]+CumProfitsS#[X][1];
        // CumProfitsL12#[X]=CumProfitsL11#[X][1]+CumProfitsL#[X][1]; 
        // CumProfitsS12#[X]=CumProfitsS11#[X][1]+CumProfitsS#[X][1];
        // CumProfitsL13#[X]=CumProfitsL12#[X][1]+CumProfitsL#[X][1]; 
        // CumProfitsS13#[X]=CumProfitsS12#[X][1]+CumProfitsS#[X][1];
        // CumProfitsL14#[X]=CumProfitsL13#[X][1]+CumProfitsL#[X][1]; 
        // CumProfitsS14#[X]=CumProfitsS13#[X][1]+CumProfitsS#[X][1];
        // CumProfitsL15#[X]=CumProfitsL14#[X][1]+CumProfitsL#[X][1]; 
        // CumProfitsS15#[X]=CumProfitsS14#[X][1]+CumProfitsS#[X][1];
        // end;
        // end;
        // end lookbackdays === 0}
        CumProfitsLqq[x] = CumProfitsLqq[x - 1];
        CumProfitsSqq[x] = CumProfitsSqq[x - 1];
        if (LookBackDays === 0) {
            for (let j = 1; j <= Size; j++) {
                CumProfitsLqq[x][j] = 0 - (Size + 1 - j) * .0001 * OneTick;
                CumProfitsSqq[x][j] = 0 - (Size + 1 - j) * .0001 * OneTick;
            }
        }

    }
}

console.log(CumProfitsLqq[250]);
console.log(CumProfitsSqq[250]);
// If LookBackDays=1 then begin
// If Date<>Date[1] and DailyBarCounter[1]>MinDailyBars then begin
// For X=1 to Size begin
// CumProfitsL##[X]=CumProfitsL#[X][1]-(Size+1-X)*.001*OneTick;
// CumProfitsS##[X]=CumProfitsS#[X][1]-(Size+1-X)*.001*OneTick;
// end;
// end;
// end;

// If LookBackDays=2 then begin
// If Date<>Date[1] and DailyBarCounter[1]>MinDailyBars then begin
// For X=1 to Size begin
// CumProfitsL##[X]=CumProfitsL2#[X]-(Size+1-X)*.001*OneTick; 
// CumProfitsS##[X]=CumProfitsS2#[X]-(Size+1-X)*.001*OneTick; 
// end;
// end;
// end;

// If LookBackDays=3 then begin
// If Date<>Date[1] and DailyBarCounter[1]>MinDailyBars then begin
// For X=1 to Size begin
// CumProfitsL##[X]=CumProfitsL3#[X]-(Size+1-X)*.001*OneTick; 
// CumProfitsS##[X]=CumProfitsS3#[X]-(Size+1-X)*.001*OneTick; 
// end;
// end;
// end;

// If LookBackDays=4 then begin
// If Date<>Date[1] and DailyBarCounter[1]>MinDailyBars then begin
// For X=1 to Size begin
// CumProfitsL##[X]=CumProfitsL4#[X]-(Size+1-X)*.001*OneTick; 
// CumProfitsS##[X]=CumProfitsS4#[X]-(Size+1-X)*.001*OneTick; 
// end;
// end;
// end;

// If LookBackDays=5 then begin
// If Date<>Date[1] and DailyBarCounter[1]>MinDailyBars then begin
// For X=1 to Size begin
// CumProfitsL##[X]=CumProfitsL5#[X]-(Size+1-X)*.001*OneTick; 
// CumProfitsS##[X]=CumProfitsS5#[X]-(Size+1-X)*.001*OneTick; 
// end;
// end;
// end;

// If LookBackDays=6 then begin
// If Date<>Date[1] and DailyBarCounter[1]>MinDailyBars then begin
// For X=1 to Size begin
// CumProfitsL##[X]=CumProfitsL6#[X]-(Size+1-X)*.001*OneTick; 
// CumProfitsS##[X]=CumProfitsS6#[X]-(Size+1-X)*.001*OneTick; 
// end;
// end;
// end;

// If LookBackDays=7 then begin
// If Date<>Date[1] and DailyBarCounter[1]>MinDailyBars then begin
// For X=1 to Size begin
// CumProfitsL##[X]=CumProfitsL7#[X]-(Size+1-X)*.001*OneTick; 
// CumProfitsS##[X]=CumProfitsS7#[X]-(Size+1-X)*.001*OneTick; 
// end;
// end;
// end;

// If LookBackDays=8 then begin
// If Date<>Date[1] and DailyBarCounter[1]>MinDailyBars then begin
// For X=1 to Size begin
// CumProfitsL##[X]=CumProfitsL8#[X]-(Size+1-X)*.001*OneTick; 
// CumProfitsS##[X]=CumProfitsS8#[X]-(Size+1-X)*.001*OneTick; 
// end;
// end;
// end;


// If LookBackDays=9 then begin
// If Date<>Date[1] and DailyBarCounter[1]>MinDailyBars then begin
// For X=1 to Size begin
// CumProfitsL##[X]=CumProfitsL9#[X]-(Size+1-X)*.001*OneTick; 
// CumProfitsS##[X]=CumProfitsS9#[X]-(Size+1-X)*.001*OneTick; 
// end;
// end;
// end;


// If LookBackDays=10 then begin
// If Date<>Date[1] and DailyBarCounter[1]>MinDailyBars then begin
// For X=1 to Size begin
// CumProfitsL##[X]=CumProfitsL10#[X]-(Size+1-X)*.001*OneTick; 
// CumProfitsS##[X]=CumProfitsS10#[X]-(Size+1-X)*.001*OneTick; 
// end;
// end;
// end;


// If LookBackDays=11 then begin
// If Date<>Date[1] and DailyBarCounter[1]>MinDailyBars then begin
// For X=1 to Size begin
// CumProfitsL##[X]=CumProfitsL11#[X]-(Size+1-X)*.001*OneTick; 
// CumProfitsS##[X]=CumProfitsS11#[X]-(Size+1-X)*.001*OneTick; 
// end;
// end;
// end;


// If LookBackDays=12 then begin
// If Date<>Date[1] and DailyBarCounter[1]>MinDailyBars then begin
// For X=1 to Size begin
// CumProfitsL##[X]=CumProfitsL12#[X]-(Size+1-X)*.001*OneTick; 
// CumProfitsS##[X]=CumProfitsS12#[X]-(Size+1-X)*.001*OneTick; 
// end;
// end;
// end;


// If LookBackDays=13 then begin
// If Date<>Date[1] and DailyBarCounter[1]>MinDailyBars then begin
// For X=1 to Size begin
// CumProfitsL##[X]=CumProfitsL13#[X]-(Size+1-X)*.001*OneTick; 
// CumProfitsS##[X]=CumProfitsS13#[X]-(Size+1-X)*.001*OneTick; 
// end;
// end;
// end;


// If LookBackDays=14 then begin
// If Date<>Date[1] and DailyBarCounter[1]>MinDailyBars then begin
// For X=1 to Size begin
// CumProfitsL##[X]=CumProfitsL14#[X]-(Size+1-X)*.001*OneTick; 
// CumProfitsS##[X]=CumProfitsS14#[X]-(Size+1-X)*.001*OneTick; 
// end;
// end;
// end;


// If LookBackDays=15 then begin
// If Date<>Date[1] and DailyBarCounter[1]>MinDailyBars then begin
// For X=1 to Size begin
// CumProfitsL##[X]=CumProfitsL15#[X]-(Size+1-X)*.001*OneTick; 
// CumProfitsS##[X]=CumProfitsS15#[X]-(Size+1-X)*.001*OneTick; 
// end;
// end;
// end;



// //If LookBackDays=1 or LookBackDays=2 or LookBackDays=3 or LookBackDays=4 or LookBackDays=5 or LookBackDays=6 or LookBackDays=7 or LookBackDays=8 or LookBackDays=9 or LookBackDays=10 
// //or LookBackDays=11 or LookBackDays=12 or LookBackDays=13 or LookBackDays=14 or LookBackDays=15 then begin
// If LookBackDays=0 then begin
// For Z=1 to Agree begin
// BestHolderL#[Z]=NthHighestArray(CumProfitsL##,Size,NthHigh+((Z-1)*AgreeSpacer)){[1]};
// BestHolderS#[Z]=NthHighestArray(CumProfitsS##,Size,NthHigh+((Z-1)*AgreeSpacer)){[1]};
// end;
// end;


// If LookBackDays>0 then begin
// If Date<>Date[1] and DailyBarCounter[1]>MinDailyBars  then begin
// For Z=1 to Agree begin
// BestHolderL#[Z]=NthHighestArray(CumProfitsL##,Size,NthHigh+((Z-1)*AgreeSpacer)){[1]};
// BestHolderS#[Z]=NthHighestArray(CumProfitsS##,Size,NthHigh+((Z-1)*AgreeSpacer)){[1]};
// end;
// end;
// end;



// If Date<>Date[1]  and DailyBarCounter[1]>MinDailyBars then begin
// For X=1 to AGXSZ begin
//  VCRWMAL###[X]=false; 
//  VCRWMAS###[X]=false;
// end;

// For Z=1 to Agree begin
// For X=1 to Size begin
// If BestHolderL#[Z]=CumProfitsL##[X]{[1]} then begin 
//         VCRWMAL###[X+Size*(Z-1)]=true;                     
//     VCRWMALNum#[Z]=X;  end;                         
// If BestHolderS#[Z]=CumProfitsS##[X]{[1]} then begin   
//         VCRWMAS###[X+Size*(Z-1)]=true;
//     VCRWMASNum#[Z]=X;  end;

// end;
// end;
// end;

// For Z=1 to Agree begin
// For X=1 to Size begin
// If VCRWMAL###[X+Size*(Z-1)] then begin RVCRWMAL#[Z]=VCRWMAL#[X]; RVCRWMAL#B[Z]=VCRWMAL#B[X]; RPushPCTL#[Z]=PushPCTL#[X]; end; 
// If VCRWMAS###[X+Size*(Z-1)] then begin RVCRWMAS#[Z]=VCRWMAS#[X]; RVCRWMAS#B[Z]=VCRWMAS#B[X]; RPushPCTS#[Z]=PushPCTS#[X]; end;
// end;
// end;


// If PushFiltType=0 then begin
// If MOMCOMBO=0 then begin
// For Z=1 to Agree begin
// If RVCRWMAS#[Z]<CWMAP1H#[Z] {and RVCRWMAS#B[Z]<CWMAP1H#B[Z]} then AGS#[Z]=1 else AGS#[Z]=0;
// If RVCRWMAL#[Z]>CWMAV1L#[Z] {and RVCRWMAL#B[Z]>CWMAV1L#B[Z]} then AGL#[Z]=1 else AGL#[Z]=0;
// end;
// end;

// If MOMCOMBO=1 then begin
// For Z=1 to Agree begin
// If RVCRWMAS#[Z]<CWMAP1H#[Z] and RVCRWMAS#B[Z]<CWMAP1H#B[Z] then AGS#[Z]=1 else AGS#[Z]=0;
// If RVCRWMAL#[Z]>CWMAV1L#[Z] and RVCRWMAL#B[Z]>CWMAV1L#B[Z] then AGL#[Z]=1 else AGL#[Z]=0;
// end;
// end;

// If MOMCOMBO=2 then begin
// For Z=1 to Agree begin
// If RVCRWMAS#[Z]<CWMAP1H#[Z] and RVCRWMAS#B[Z]>CWMAP1H#B[Z] then AGS#[Z]=1 else AGS#[Z]=0;
// If RVCRWMAL#[Z]>CWMAV1L#[Z] and RVCRWMAL#B[Z]<CWMAV1L#B[Z] then AGL#[Z]=1 else AGL#[Z]=0;
// end;
// end;
// end;


// If PushFiltType=1 then begin
// For Z=1 to Agree begin
// If RVCRWMAS#[Z]<CWMAP1H#[Z] and RVCRWMAS#B[Z]<CWMAP1H#B[Z] and RPushPCTS#[Z]>=PushPCT then AGS#[Z]=1 else AGS#[Z]=0;
// If RVCRWMAL#[Z]>CWMAV1L#[Z] and RVCRWMAL#B[Z]>CWMAV1L#B[Z] and RPushPCTL#[Z]>=PushPCT then AGL#[Z]=1 else AGL#[Z]=0;
// end;
// end;

// If PushFiltType=-1 then begin
// For Z=1 to Agree begin
// If RVCRWMAS#[Z]<CWMAP1H#[Z] and RVCRWMAS#B[Z]<CWMAP1H#B[Z] and RPushPCTS#[Z]<=PushPCT then AGS#[Z]=1 else AGS#[Z]=0;
// If RVCRWMAL#[Z]>CWMAV1L#[Z] and RVCRWMAL#B[Z]>CWMAV1L#B[Z] and RPushPCTL#[Z]<=PushPCT then AGL#[Z]=1 else AGL#[Z]=0;
// end;
// end;



// AGL##=SummationArray(AGL#,AGMAX);
// AGS##=SummationArray(AGS#,AGMAX);


// If AGL##=Agree then AGL=True else AGL=false;
// If AGS##=Agree then AGS=True else AGS=false;


// If PushFilterB=1 then begin
// For Z=1 to Agree begin
// If ThisBar-SigBarPH<=Spacing and (RVCRWMAS#[Z]>CWMAP1H#[Z] {or RVCRWMAS#B[Z]>CWMAP1H#B[Z]}) then begin
// DontGoShort=True;
// end;
// end;

// For Z=1 to Agree begin
// If ThisBar-SigBarVL<=Spacing and (RVCRWMAL#[Z]<CWMAV1L#[Z] {or RVCRWMAL#B[Z]<CWMAV1L#B[Z]}) then begin
// DontGoLong=True;
// end;
// end;
// end;

// If PVNumFilter=0 then begin
// PVFilterL=True;
// PVFilterS=True;
// end;


// If PVNumFilter=1 then begin
// For Z=1 to Agree begin
// If RPMOM1[Z]<RPMOM2[Z] and PNum>=PVNum then PVFilterS##[Z]=1 else PVFilterS##[Z]=0;
// If RVMOM1[Z]>RVMOM2[Z] and VNum>=PVNum then PVFilterL##[Z]=1 else PVFilterL##[Z]=0;
// end;

// AGLPV##=SummationArray(PVFilterL##,AGMAX);
// AGSPV##=SummationArray(PVFilterS##,AGMAX);

// If AGLPV##=Agree then PVFilterL=True else PVFilterL=false;
// If AGSPV##=Agree then PVFilterS=True else PVFilterS=false;

// end;


// If PVNumFilter=2 then begin
// For Z=1 to Agree begin
// If RPMOM1[Z]>RPMOM2[Z] and PNum>=PVNum then PVFilterS##[Z]=1 else PVFilterS##[Z]=0;
// If RVMOM1[Z]<RVMOM2[Z] and VNum>=PVNum then PVFilterL##[Z]=1 else PVFilterL##[Z]=0;
// end;

// AGLPV##=SummationArray(PVFilterL##,AGMAX);
// AGSPV##=SummationArray(PVFilterS##,AGMAX);

// If AGLPV##=Agree then PVFilterL=True else PVFilterL=false;
// If AGSPV##=Agree then PVFilterS=True else PVFilterS=false;

// end;

// If ThisBar-SigBarVL>=Spacing then begin
// DontGoLong=false;
// end;

// If ThisBar-SigBarPH>=Spacing then begin
// DontGoShort=false;
// end;



// {XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX}
// {KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK}
// {****************************************************************************************************************************}
// If Mirror=0 then begin
// If EntryType=1 then begin
// If MP=1 or ThisBar-SigBarL>=EntWin then begin
// SigL=false;
// end;
// If MP<>1 and Valley1 and AGL and (Config0 or Config1 or Config2 or Config3L or Config4L) and PVFilterL and
// ThisBar-SigBarVL<=Spacing and ThisBar-SigBarVL>=StartSpacing and NTL1 then begin
// SigBarL=ThisBar;
// SigL=True;
// end;




// If (GoLongShort=1 or GoLongShort=3) and MP[1]<>1 and MP<>1 and SigL and ThisBar-SigBarL<=EntWin and DontRTradeToday=false and DontGoLong=false  and TExit2L=false and Mindays and NTL1 
// and (BF0 or BF1L or BF2L) then begin
// Buy ("JL") next bar LoBand20 limit; end; 
// If MP=1 and MP[1]<>1 then begin
// EntryLevelL=LoBand20[1];
// EntryPriceL=EntryPrice(0);
// EntryBarL=ThisBar-1;
// end;

// If MP=1 then begin
// Sell ("TXL0") next bar from entry ("JL") THiBand20 limit; end;



// If SafetyX=1 and MP=1 and MP[1]=1 and Low<XDLoBand[1] and XDLoBand[1]<EntryLevelL then begin
// Exit2L=True;
// end;
// If Exit2L then begin
// Sell ("XL02") next bar from entry ("JL") XMA13 limit; end;


// If (TExit2=1 or TExit2=2) and MP=1 and MP[1]=1 and High>=TX2HiBand20[1] and TX2HiBand20[1]>=EntryLevelL then begin
// TExit2L=True;
// end;
// If TExit2L then begin
// Sell ("TXL02") next bar from entry ("JL") XMA13 stop; end;

// If MP=1 and High>THiBand20[1] then begin
// TouchXL=true;
// end;

// If TouchXL and MP=1 and MP[1]=1 then begin
// Sell ("TXL03") next bar from entry ("JL") Low-OneTick stop; end;

// If (MP[1]=1 and MP<>1) or Low<=EntryPriceL-StopLossConversion then begin
// TExit2L=false;
// Exit2L=false;
// TouchXL=false;
// end;
// end;
// end;


// If Mirror=0 then begin
// If EntryType=3 then begin
// If MP=1 or ThisBar-SigBarL>=EntWin then begin
// SigL=false;
// end;



// If MP<>1 and Valley1 and AGL and (Config0 or Config1 or Config2 or Config3L or Config4L) and PVFilterL and
// ThisBar-SigBarVL<=Spacing and ThisBar-SigBarVL>=StartSpacing and NTL1 then begin
// SigBarL=ThisBar;
// SigL=True;
// end;


// If MP=1 or ThisBar-SigBarL>=Spacing2 then begin
// ET3L=false;
// end;

// If (GoLongShort=1 or GoLongShort=3) and ET3L=false and SigL[1] and ThisBar[1]-SigBarL[1]<=EntWin and DontRTradeToday[1]=false and DontGoLong[1]=false  and TExit2L[1]=false and Mindays and NTL1[1] 
// and (BF0[1] or BF1L[1] or BF2L[1]) and Low<=LoBand20[1]-OneTick then begin
// ET3L=True;
// LEntThresh=LoBand20[1];
// end;


// If ET3L and MP<>1 and DontRTradeToday=false and High>=LEntThresh then begin
// Buy ("J3L") next bar High+OneTick stop; end;

// If MP=1 and MP[1]<>1 then begin
// EntryLevelL=High[1]+OneTick;
// EntryPriceL=EntryPrice(0);
// ET3L=false;
// LEntThresh=0;
// end;

// If MP=1 then begin
// Sell ("T3XL0") next bar from entry ("J3L") THiBand20 limit; end;



// If SafetyX=1 and MP=1 and MP[1]=1 and Low<XDLoBand[1] and XDLoBand[1]<EntryLevelL then begin
// Exit2L=True;
// end;
// If Exit2L then begin
// Sell ("X3L02") next bar from entry ("J3L") XMA13 limit; end;


// If (TExit2=1 or TExit2=2) and MP=1 and MP[1]=1 and High>=TX2HiBand20[1] and TX2HiBand20[1]>=EntryLevelL then begin
// TExit2L=True;
// end;
// If TExit2L then begin
// Sell ("T3XL02") next bar from entry ("J3L") XMA13 stop; end;

// If MP=1 and High>THiBand20[1] then begin
// TouchXL=true;
// end;

// If TouchXL and MP=1 and MP[1]=1 then begin
// Sell ("T3XL03") next bar from entry ("J3L") Low-OneTick stop; end;

// If (MP[1]=1 and MP<>1) or Low<=EntryPriceL-StopLossConversion then begin
// TExit2L=false;
// Exit2L=false;
// TouchXL=false;
// end;
// end;
// end;

// If Mirror=1 then begin
// If EntryType=1 then begin
// If MP=-1 or ThisBar-SigBarL>=EntWin then begin
// SigL=false;
// end;
// If MP<>-1 and Valley1 and AGL and (Config0 or Config1 or Config2 or Config3L or Config4L) and PVFilterL and
// ThisBar-SigBarVL<=Spacing and ThisBar-SigBarVL>=StartSpacing and NTL1 then begin
// SigBarL=ThisBar;
// SigL=True;
// end;




// If (GoLongShort=1 or GoLongShort=3) and MP[1]<>-1 and MP<>-1 and SigL and ThisBar-SigBarL<=EntWin and DontRTradeToday=false and DontGoLong=false  and TExit2L=false and Mindays and NTL1  
// and (BF0 or BF1L or BF2L) then begin
// SellShort ("JML") next bar LoBand20-OneTick stop; end; 
// If MP=-1 and MP[1]<>-1 then begin
// EntryLevelL=LoBand20[1];
// EntryPriceL=EntryPrice(0);
// EntryBarL=ThisBar-1;
// end;

// If MP=-1 then begin
// BuyToCover ("TXML0") next bar from entry ("JML") THiBand20+OneTick stop; end;



// If SafetyX=1 and MP=-1 and MP[1]=-1 and Low<XDLoBand[1] and XDLoBand[1]<EntryLevelL then begin
// Exit2L=True;
// end;
// If Exit2L then begin
// BuyToCover ("XML02") next bar from entry ("JML") XMA13+OneTick stop; end;


// If (TExit2=1 or TExit2=2) and MP=-1 and MP[1]=-1 and High>=TX2HiBand20[1] and TX2HiBand20[1]>=EntryLevelL then begin
// TExit2L=True;
// end;
// If TExit2L then begin
// BuyToCover ("TXML02") next bar from entry ("JML") XMA13+OneTick limit; end;

// If MP=-1 and High>THiBand20[1] then begin
// TouchXL=true;
// end;

// If TouchXL and MP=-1 and MP[1]=-1 then begin
// BuyToCover ("TXML03") next bar from entry ("JML") Low limit; end;

// If (MP[1]=-1 and MP<>-1) or Low<=EntryPriceL-StopLossConversion then begin
// TExit2L=false;
// Exit2L=false;
// TouchXL=false;
// end;
// end;
// end;

// If Mirror=0 then begin
// If EntryType=2 then begin
// If MP=-1 or ThisBar-SigBarL>=EntWin then begin
// SigL=false;
// end;
// If MP<>-1 and Valley1 and AGL and (Config0 or Config1 or Config2 or Config3L or Config4L) and PVFilterL and
// ThisBar-SigBarVL<=Spacing and ThisBar-SigBarVL>=StartSpacing and NTL1 then begin
// SigBarL=ThisBar;
// SigL=True;
// end;




// If (GoLongShort=2 or GoLongShort=3) and MP[2]<>-1 and MP[1]<>-1 and MP<>-1 and SigL and ThisBar-SigBarL<=EntWin and DontRTradeToday=false and DontGoLong=false  and TExit2L=false and Mindays and NTL1  
// and (BF0 or BF1L or BF2L) then begin
// SellShort ("J2S") next bar LoBand20 stop; end; 
// If MP=-1 and MP[1]<>-1 then begin
// EntryLevelL=LoBand20[1];
// EntryPriceL=EntryPrice(0);
// EntryBarL=ThisBar-1;
// end;

// If MP=-1 then begin
// BuyToCover ("T2XL0") next bar from entry ("J2S") TLoBand20 limit; end;



// If SafetyX=1 and MP=-1 and MP[1]=-1 and High>XDHiBand[1] {and XDHiBand[1]>EntryLevelL} then begin
// Exit2L=True;
// end;
// If Exit2L then begin
// BuyToCover ("X2L02") next bar from entry ("J2S") LoBand20 limit; end;


// If (TExit2=1 or TExit2=2) and MP=-1 and MP[1]=-1 and Low<=TX2LoBand20[1] and TX2LoBand20[1]<=EntryLevelL then begin
// TExit2L=True;
// end;
// If TExit2L then begin
// BuyToCover ("T2XL02") next bar from entry ("J2S") LoBand20 stop; end;

// If MP=-1 and Low<TLoBand20[1] then begin
// TouchXL=true;
// end;

// If TouchXL and MP=-1 and MP[1]=-1 then begin
// BuyToCover ("T2XL03") next bar from entry ("J2S") High+OneTick stop; end;

// If (MP[1]=-1 and MP<>-1) or High>=EntryPriceL+StopLossConversion then begin
// TExit2L=false;
// Exit2L=false;
// TouchXL=false;
// end;
// end;
// end;


// If Mirror=1 then begin
// If EntryType=2 then begin
// If MP=1 or ThisBar-SigBarL>=EntWin then begin
// SigL=false;
// end;
// If MP<>1 and Valley1 and AGL and (Config0 or Config1 or Config2 or Config3L or Config4L) and PVFilterL and
// ThisBar-SigBarVL<=Spacing and ThisBar-SigBarVL>=StartSpacing and NTL1 then begin
// SigBarL=ThisBar;
// SigL=True;
// end;




// If (GoLongShort=2 or GoLongShort=3) and MP[1]<>1 and MP<>1 and SigL and ThisBar-SigBarL<=EntWin and DontRTradeToday=false and DontGoLong=false  and TExit2L=false and Mindays and NTL1 
// and (BF0 or BF1L or BF2L) then begin
// Buy ("JM2S") next bar LoBand20+OneTick limit; end; 
// If MP=1 and MP[1]<>1 then begin
// EntryLevelL=LoBand20[1];
// EntryPriceL=EntryPrice(0);
// EntryBarL=ThisBar-1;
// end;

// If MP=1 then begin
// Sell ("TM2XL0") next bar from entry ("JM2S") TLoBand20-OneTick stop; end;



// If SafetyX=1 and MP=1 and MP[1]=1 and High>XDHiBand[1] {and XDHiBand[1]>EntryLevelL} then begin
// Exit2L=True;
// end;
// If Exit2L then begin
// Sell ("XM2L02") next bar from entry ("JM2S") LoBand20-OneTick stop; end;


// If (TExit2=1 or TExit2=2) and MP=1 and MP[1]=1 and Low<=TX2LoBand20[1] and TX2LoBand20[1]<=EntryLevelL then begin
// TExit2L=True;
// end;
// If TExit2L then begin
// Sell ("TM2XL02") next bar from entry ("JM2S") LoBand20-OneTick limit; end;

// If MP=1 and Low<TLoBand20[1] then begin
// TouchXL=true;
// end;

// If TouchXL and MP=1 and MP[1]=1 then begin
// Sell ("TM2XL03") next bar from entry ("JM2S") High limit; end;

// If (MP[1]=1 and MP<>1) or High>=EntryPriceL+StopLossConversion then begin
// TExit2L=false;
// Exit2L=false;
// TouchXL=false;
// end;
// end;
// end;




// {********************************************************************************************************************************}

// If Mirror=0 then begin
// If EntryType=1 then begin
// If MP=-1 or ThisBar-SigBarS>=EntWin then begin
// SigS=false;
// end;
// If MP<>-1 and Peak1 and AGS and (Config0 or Config1 or Config2 or Config3S or Config4S) and PVFilterS and
// ThisBar-SigBarPH<=Spacing and ThisBar-SigBarPH>=StartSpacing and NTH1 then begin
// SigBarS=ThisBar;
// SigS=True;
// end;

// If (GoLongShort=2 or GoLongShort=3) and MP[1]<>-1 and MP<>-1 and SigS and ThisBar-SigBarS<=EntWin and DontRTradeToday=false and DontGoShort=false and TExit2S=false and Mindays and NTH1 
// and (BF0 or BF1S or BF2S) then begin
// SellShort ("JS") next bar HiBand20 limit; end;

// If MP=-1 and MP[1]<>-1 then begin
// EntryLevelS=HiBand20[1];
// EntryPriceS=EntryPrice(0);
// EntryBarS=ThisBar-1;
// end;

// If MP=-1 then begin
// BuyToCover ("TXS0") next bar from entry ("JS") TLoBand20 limit; end;



// If SafetyX=1 and MP=-1 and MP[1]=-1 and High>XDHiBand[1] and XDHiBand[1]>EntryLevelS then begin
// Exit2S=True;
// end;
// If Exit2S then begin
// BuyToCover ("XS02") next bar from entry ("JS") XMA13 limit; end;


// If (TExit2=1 or TExit2=2) and MP=-1 and MP[1]=-1 and Low<TX2LoBand20[1] and TX2LoBand20[1]<EntryLevelS then begin
// TExit2S=True;
// end;
// If TExit2S then begin
// BuyToCover ("TXS02") next bar from entry ("JS") XMA13 stop; end;

// If MP=-1 and Low<TLoBand20[1] then begin
// TouchXS=true;
// end;

// If TouchXS and MP=-1 and MP[1]=-1 then begin
// BuyToCover ("TXS03") next bar from entry ("JS") High+OneTick stop; end;

// If (MP[1]=-1 and MP<>-1) or High>=EntryPriceS+StopLossConversion then begin
// TExit2S=false;
// Exit2S=false;
// TouchXS=false;
// end;
// end; 
// end;

// If Mirror=0 then begin
// If EntryType=3 then begin
// If MP=-1 or ThisBar-SigBarS>=EntWin then begin
// SigS=false;
// end;
// If MP<>-1 and Peak1 and AGS and (Config0 or Config1 or Config2 or Config3S or Config4S) and PVFilterS and
// ThisBar-SigBarPH<=Spacing and ThisBar-SigBarPH>=StartSpacing and NTH1 then begin
// SigBarS=ThisBar;
// SigS=True;
// end;

// If MP=-1 or ThisBar-SigBarS>=Spacing2 then begin
// ET3S=false;
// end;

// If (GoLongShort=2 or GoLongShort=3) and ET3S=false and SigS[1] and ThisBar[1]-SigBarS[1]<=EntWin and DontRTradeToday[1]=false and DontGoShort[1]=false and TExit2S[1]=false and Mindays and NTH1[1] 
// and (BF0[1] or BF1S[1] or BF2S[1]) and High>=HiBand20[1]+OneTick then begin
// ET3S=True;
// SEntThresh=HiBand20[1]; 
// end;

// If ET3S and MP<>-1 and DontRTradeToday=false and Low<=SEntThresh then begin
// SellShort ("J3S") next bar Low-OneTick stop; end;

// If MP=-1 and MP[1]<>-1 then begin
// EntryLevelS=Low[1]-OneTick;
// EntryPriceS=EntryPrice(0);
// ET3S=false;
// SEntThresh=0;
// end;

// If MP=-1 then begin
// BuyToCover ("T3XS0") next bar from entry ("J3S") TLoBand20 limit; end;



// If SafetyX=1 and MP=-1 and MP[1]=-1 and High>XDHiBand[1] and XDHiBand[1]>EntryLevelS then begin
// Exit2S=True;
// end;
// If Exit2S then begin
// BuyToCover ("X3S02") next bar from entry ("J3S") XMA13 limit; end;


// If (TExit2=1 or TExit2=2) and MP=-1 and MP[1]=-1 and Low<TX2LoBand20[1] and TX2LoBand20[1]<EntryLevelS then begin
// TExit2S=True;
// end;
// If TExit2S then begin
// BuyToCover ("T3XS02") next bar from entry ("J3S") XMA13 stop; end;

// If MP=-1 and Low<TLoBand20[1] then begin
// TouchXS=true;
// end;

// If TouchXS and MP=-1 and MP[1]=-1 then begin
// BuyToCover ("T3XS03") next bar from entry ("J3S") High+OneTick stop; end;

// If (MP[1]=-1 and MP<>-1) or High>=EntryPriceS+StopLossConversion then begin
// TExit2S=false;
// Exit2S=false;
// TouchXS=false;
// end;
// end; 
// end;


// If Mirror=1 then begin
// If EntryType=1 then begin
// If MP=1 or ThisBar-SigBarS>=EntWin then begin
// SigS=false;
// end;
// If MP<>1 and Peak1 and AGS and (Config0 or Config1 or Config2 or Config3S or Config4S) and PVFilterS and
// ThisBar-SigBarPH<=Spacing and ThisBar-SigBarPH>=StartSpacing and NTH1 then begin
// SigBarS=ThisBar;
// SigS=True;
// end;

// If (GoLongShort=2 or GoLongShort=3) and MP[1]<>1 and MP<>1 and SigS and ThisBar-SigBarS<=EntWin and DontRTradeToday=false and DontGoShort=false and TExit2S=false and Mindays and NTH1  
// and (BF0 or BF1S or BF2S) then begin
// Buy ("JMS") next bar HiBand20+OneTick stop; end;

// If MP=1 and MP[1]<>1 then begin
// EntryLevelS=HiBand20[1];
// EntryPriceS=EntryPrice(0);
// EntryBarS=ThisBar-1;
// end;

// If MP=1 then begin
// Sell ("TXMS0") next bar from entry ("JMS") TLoBand20-OneTick stop; end;



// If SafetyX=1 and MP=1 and MP[1]=1 and High>XDHiBand[1] and XDHiBand[1]>EntryLevelS then begin
// Exit2S=True;
// end;
// If Exit2S then begin
// Sell ("XMS02") next bar from entry ("JMS") XMA13-OneTick stop; end;


// If (TExit2=1 or TExit2=2) and MP=1 and MP[1]=1 and Low<TX2LoBand20[1] and TX2LoBand20[1]<EntryLevelS then begin
// TExit2S=True;
// end;
// If TExit2S then begin
// Sell ("TXMS02") next bar from entry ("JMS") XMA13-OneTick limit; end;

// If MP=1 and Low<TLoBand20[1] then begin
// TouchXS=true;
// end;

// If TouchXS and MP=1 and MP[1]=1 then begin
// Sell ("TXMS03") next bar from entry ("JMS") High limit; end;

// If (MP[1]=1 and MP<>1) or High>=EntryPriceS+StopLossConversion then begin
// TExit2S=false;
// Exit2S=false;
// TouchXS=false;
// end;
// end; 
// end;

// If Mirror=0 then begin
// If EntryType=2 then begin
// If MP=1 or ThisBar-SigBarS>=EntWin then begin
// SigS=false;
// end;
// If MP<>1 and Peak1 and AGS and (Config0 or Config1 or Config2 or Config3S or Config4S) and PVFilterS and
// ThisBar-SigBarPH<=Spacing and ThisBar-SigBarPH>=StartSpacing and NTH1 then begin
// SigBarS=ThisBar;
// SigS=True;
// end;

// If (GoLongShort=1 or GoLongShort=3) and MP[2]<>1 and MP[1]<>1 and MP<>1 and SigS and ThisBar-SigBarS<=EntWin and DontRTradeToday=false and DontGoShort=false and TExit2S=false and Mindays and NTH1  
// and (BF0 or BF1S or BF2S) then begin
// Buy ("J2L") next bar HiBand20 stop; end;

// If MP=1 and MP[1]<>1 then begin
// EntryLevelS=HiBand20[1];
// EntryPriceS=EntryPrice(0);
// EntryBarS=ThisBar-1;
// end;

// If MP=1 then begin
// Sell ("T2XS0") next bar from entry ("J2L") THiBand20 limit; end;



// If SafetyX=1 and MP=1 and MP[1]=1 and Low<XDLoBand[1] {and XDLoBand[1]<EntryLevelS} then begin
// Exit2S=True;
// end;
// If Exit2S then begin
// Sell ("X2S02") next bar from entry ("J2L") HiBand20 limit; end;


// If (TExit2=1 or TExit2=2) and MP=1 and MP[1]=1 and High>TX2HiBand20[1] and TX2HiBand20[1]>EntryLevelS then begin
// TExit2S=True;
// end;
// If TExit2S then begin
// Sell ("T2XS02") next bar from entry ("J2L") HiBand20 stop; end;

// If MP=1 and High>THiBand20[1] then begin
// TouchXS=true;
// end;

// If TouchXS and MP=1 and MP[1]=1 then begin
// Sell ("T2XS03") next bar from entry ("J2L") Low-OneTick stop; end;

// If (MP[1]=1 and MP<>1) or Low<=EntryPriceS-StopLossConversion then begin
// TExit2S=false;
// Exit2S=false;
// TouchXS=false;
// end;
// end; 
// end;

// If Mirror=1 then begin
// If EntryType=2 then begin
// If MP=-1 or ThisBar-SigBarS>=EntWin then begin
// SigS=false;
// end;
// If MP<>-1 and Peak1 and AGS and (Config0 or Config1 or Config2 or Config3S or Config4S) and PVFilterS and
// ThisBar-SigBarPH<=Spacing and ThisBar-SigBarPH>=StartSpacing and NTH1 then begin
// SigBarS=ThisBar;
// SigS=True;
// end;

// If (GoLongShort=1 or GoLongShort=3) and MP[1]<>-1 and MP<>-1 and SigS and ThisBar-SigBarS<=EntWin and DontRTradeToday=false and DontGoShort=false and TExit2S=false and Mindays and NTH1  
// and (BF0 or BF1S or BF2S) then begin
// SellShort ("JM2L") next bar HiBand20-OneTick limit; end;

// If MP=-1 and MP[1]<>-1 then begin
// EntryLevelS=HiBand20[1];
// EntryPriceS=EntryPrice(0);
// EntryBarS=ThisBar-1;
// end;

// If MP=-1 then begin
// BuyToCover ("TM2XS0") next bar from entry ("JM2L") THiBand20+OneTick stop; end;



// If SafetyX=1 and MP=-1 and MP[1]=-1 and Low<XDLoBand[1] {and XDLoBand[1]<EntryLevelS} then begin
// Exit2S=True;
// end;
// If Exit2S then begin
// BuyToCover ("XM2S02") next bar from entry ("JM2L") HiBand20+OneTick stop; end;


// If (TExit2=1 or TExit2=2) and MP=-1 and MP[1]=-1 and High>TX2HiBand20[1] and TX2HiBand20[1]>EntryLevelS then begin
// TExit2S=True;
// end;
// If TExit2S then begin
// BuyToCover ("TM2XS02") next bar from entry ("JM2L") HiBand20+OneTick limit; end;

// If MP=-1 and High>THiBand20[1] then begin
// TouchXS=true;
// end;

// If TouchXS and MP=-1 and MP[1]=-1 then begin
// BuyToCover ("TM2XS03") next bar from entry ("JM2L") Low limit; end;

// If (MP[1]=-1 and MP<>-1) or Low<=EntryPriceS-StopLossConversion then begin
// TExit2S=false;
// Exit2S=false;
// TouchXS=false;
// end;
// end; 
// end;

// If ExitatTooLate=1 and Time>=TooLate then begin
// Sell ("X@TooLateL2") next bar from entry ("JL") market;
// BuyToCover ("X@TooLateS2") next bar from entry ("JS") market;
// Sell ("X@TooLateL3") next bar from entry ("J3L") market;
// BuyToCover ("X@TooLateS3") next bar from entry ("J3S") market;
// BuyToCover ("X@TooLateML2") next bar from entry ("JML") market;
// Sell ("X@TooLateMS2") next bar from entry ("JMS") market;
// Sell ("X@TooLate2L") next bar from entry ("J2L") market;
// BuyToCover ("X@Toolate2S") next bar from entry ("J2S") market; 
// Sell ("X@TooLateM2S") next bar from entry ("JM2S") market;
// BuyToCover ("X@ToolateM2L") next bar from entry ("JM2L") market; 
// end;


// If ExitonFriday=1 and dayofweek(date)=5 then setexitonclose;
// If ExitAtTooLate=1 then setexitonclose;

// SetStopContract;
// If Mirror=0 then begin
// SetStopLoss(StopLoss);
// end;
// If Mirror=1 then begin
// SetProfitTarget(StopLoss-2*OneTick*DollarsPerPt);
// end;
