/** @type {jsonOdm|exports} */
var jsonOdm = require('../bin/json.odm.min.js');

var polygon = [
    [51.164964,13.679275],[51.164961,13.679078],[51.164931,13.679041],[51.164843,13.679046],[51.164073,13.679118],[51.164070,13.679116],[51.164075,13.678966],[51.164087,13.678830],[51.164090,13.678756],[51.164076,13.678644],[51.164043,13.678553],[51.163982,13.678488],[51.163703,13.678313],[51.163647,13.678243],[51.163703,13.678314],[51.163982,13.678487],[51.164044,13.678553],[51.164076,13.678644],[51.164090,13.678756],[51.164087,13.678827],[51.164076,13.678966],[51.164071,13.679094],[51.164068,13.679204],[51.164075,13.679330],[51.164107,13.679427],[51.164164,13.679556],[51.164198,13.679696],[51.164204,13.679760],[51.164282,13.681605],[51.164275,13.681841],[51.164208,13.681950],[51.164134,13.682023],[51.163938,13.682208],[51.163784,13.682388],[51.163521,13.682699],[51.163387,13.682860],[51.163124,13.683279],[51.163131,13.684287],[51.163326,13.686422],[51.163333,13.686562],[51.163360,13.686594],[51.164191,13.686647],[51.164154,13.686857],[51.164097,13.687152],[51.164093,13.687441],[51.164174,13.688085],[51.164221,13.688450],[51.164213,13.688573],[51.164187,13.688681],[51.164149,13.688809],[51.164100,13.688933],[51.164026,13.689196],[51.163959,13.689448],[51.163582,13.691003],[51.163346,13.692001],[51.163326,13.692159],[51.163319,13.692312],[51.163346,13.692543],[51.163464,13.693026],[51.163547,13.693358],[51.163582,13.693557],[51.163589,13.693718],[51.163621,13.694659],[51.163740,13.695638],[51.163955,13.696534],[51.164073,13.696958],[51.164160,13.697199],[51.164255,13.697414],[51.164376,13.697671],[51.164436,13.697816],[51.164477,13.697929],[51.164514,13.698058],[51.164544,13.698277],[51.164598,13.698573],[51.164675,13.698927],[51.164786,13.699259],[51.164914,13.699511],[51.165146,13.699962],[51.165836,13.701303],[51.165940,13.701158],[51.166155,13.700801],[51.166283,13.700623],[51.166350,13.700539],[51.166418,13.700498],[51.166302,13.701636],[51.166288,13.701797],[51.166287,13.701882],[51.166297,13.701963],[51.166322,13.702055],[51.166354,13.702132],[51.167568,13.705385],[51.167793,13.706126],[51.168197,13.706120],[51.168436,13.706126],[51.168419,13.705613],[51.168402,13.705257],[51.168401,13.704962],[51.168426,13.704964],[51.168471,13.704943],[51.168513,13.704889],[51.168547,13.704827],[51.168562,13.704734],[51.168581,13.704607],[51.168593,13.704523],[51.168601,13.704439],[51.168595,13.704327],[51.168577,13.704231],[51.168521,13.704028],[51.168472,13.703828],[51.168450,13.703734],[51.168434,13.703630],[51.168424,13.703548],[51.168228,13.697919],[51.168197,13.696453],[51.168191,13.696084],[51.168178,13.695715],[51.168159,13.695116],[51.168141,13.694890],[51.168122,13.694746],[51.168080,13.694623],[51.168039,13.694525],[51.168017,13.694365],[51.167979,13.693443],[51.168017,13.693416],[51.168149,13.693403],[51.168291,13.693423],[51.168369,13.693437],[51.168466,13.693436],[51.168557,13.693432],[51.168637,13.693436],[51.168807,13.693405],[51.168878,13.693376],[51.168930,13.693344],[51.169013,13.693313],[51.169125,13.693220],[51.169275,13.693093],[51.169416,13.692985],[51.169495,13.692947],[51.169606,13.692917],[51.169711,13.692888],[51.169837,13.692846],[51.169940,13.692808],[51.170011,13.692775],[51.170082,13.692736],[51.170135,13.692686],[51.170212,13.692617],[51.170264,13.692556],[51.170301,13.692501],[51.170328,13.692417],[51.170357,13.692264],[51.170405,13.691923],[51.170440,13.691669],[51.170482,13.691442],[51.170524,13.691218],[51.170584,13.690974],[51.170621,13.690801],[51.170679,13.690352],[51.170688,13.690243],[51.170700,13.689870],[51.170700,13.689621],[51.170690,13.689318],[51.170679,13.689205],[51.170670,13.689094],[51.170643,13.688868],[51.170597,13.688643],[51.170577,13.688572],[51.170522,13.688438],[51.170429,13.688288],[51.170337,13.688128],[51.170272,13.688015],[51.170224,13.687951],[51.170185,13.687871],[51.170125,13.687731],[51.170043,13.687500],[51.169950,13.687299],[51.169860,13.687114],[51.169765,13.686916],[51.169688,13.686755],[51.169590,13.686554],[51.169572,13.686521],[51.169586,13.686422],[51.169583,13.686257],[51.169569,13.685782],[51.169556,13.685461],[51.169546,13.685038],[51.169529,13.684260],[51.169531,13.684083],[51.169522,13.683893],[51.169507,13.683708],[51.169489,13.683370],[51.169472,13.682962],[51.169452,13.682509],[51.169448,13.682015],[51.169453,13.681468],[51.169448,13.681042],[51.169428,13.680508],[51.169420,13.679934],[51.169411,13.679384],[51.169391,13.678735],[51.169379,13.678196],[51.169361,13.677509],[51.169342,13.676763],[51.169341,13.676401],[51.169358,13.676230],[51.169393,13.676109],[51.169487,13.675889],[51.169874,13.675068],[51.169946,13.674891],[51.169958,13.674827],[51.169936,13.674720],[51.169923,13.674575],[51.169886,13.674422],[51.169854,13.674154],[51.169825,13.673928],[51.169600,13.673395],[51.169558,13.673293],[51.169550,13.673240],[51.169573,13.673183],[51.169480,13.673094],[51.169301,13.672940],[51.169104,13.672774],[51.168998,13.672701],[51.168884,13.672634],[51.168771,13.672594],[51.168632,13.672591],[51.168507,13.672617],[51.168342,13.672666],[51.168033,13.672771],[51.167719,13.672880],[51.167430,13.672976],[51.167026,13.673094],[51.166781,13.673177],[51.166641,13.673251],[51.166514,13.673361],[51.166389,13.673523],[51.166279,13.673696],[51.166190,13.673793],[51.166211,13.674006],[51.166238,13.674175],[51.166238,13.674335],[51.166227,13.674482],[51.166196,13.674653],[51.166091,13.675007],[51.165972,13.675320],[51.165804,13.676045],[51.165599,13.677109],[51.165377,13.678225],[51.165008,13.677906],[51.164719,13.677702],[51.164240,13.677458],[51.163927,13.677332],[51.163732,13.677222],[51.163515,13.677152],[51.163239,13.677061],[51.162891,13.676938],[51.162568,13.676841],[51.162203,13.676747],[51.162037,13.676710],[51.161794,13.676742],[51.161489,13.676847],[51.161338,13.676895],[51.161214,13.676919],[51.161191,13.676923],[51.161039,13.677354],[51.160948,13.677598],[51.160875,13.677814],[51.160723,13.678119],[51.160596,13.678370],[51.160409,13.678708],[51.160273,13.678917],[51.160124,13.679161],[51.159937,13.679486],[51.159834,13.679698],[51.159822,13.679676],[51.159826,13.679537],[51.159822,13.679397],[51.159792,13.679250],[51.159718,13.679113],[51.159479,13.678732],[51.159266,13.678386],[51.159227,13.678300],[51.159109,13.678029],[51.159069,13.677946],[51.159035,13.677885],[51.158988,13.677842],[51.158917,13.677799],[51.158778,13.677726],[51.158699,13.677673],[51.158640,13.677622],[51.158566,13.677541],[51.158539,13.677490],[51.158502,13.677498],[51.158424,13.677514],[51.158332,13.677453],[51.158247,13.677391],[51.158190,13.677309],[51.158112,13.677201],[51.158023,13.677124],[51.157928,13.677060],[51.157862,13.677028],[51.157689,13.676945],[51.157534,13.676880],[51.157433,13.676835],[51.157207,13.676715],[51.157133,13.676668],[51.156837,13.676383],[51.156495,13.676074],[51.156135,13.675736],[51.155788,13.675409],[51.155662,13.675253],[51.155620,13.675189],[51.155550,13.675160],[51.155444,13.675342],[51.155317,13.675581],[51.155290,13.675664],[51.155294,13.675734],[51.155317,13.675817],[51.155371,13.675953],[51.155481,13.676157],[51.155556,13.676243],[51.155523,13.676334],[51.155418,13.676635],[51.155289,13.677050],[51.155174,13.677402],[51.155107,13.677600],[51.155047,13.677531],[51.154877,13.677378],[51.154725,13.677230],[51.154587,13.677107],[51.154475,13.677040],[51.154379,13.676943],[51.154221,13.676790],[51.154130,13.676675],[51.153896,13.676238],[51.153728,13.675935],[51.153665,13.675841],[51.153612,13.675798],[51.153548,13.675771],[51.153319,13.675680],[51.152965,13.675540],[51.152701,13.675433],[51.152294,13.675379],[51.151754,13.675302],[51.151821,13.675217],[51.151921,13.675099],[51.152013,13.674980],[51.152154,13.674800],[51.152296,13.674626],[51.152447,13.674454],[51.152549,13.674321],[51.152587,13.674273],[51.152658,13.674182],[51.152717,13.674075],[51.152870,13.673817],[51.152971,13.673662],[51.153078,13.673498],[51.153246,13.673202],[51.153486,13.672787],[51.153618,13.672567],[51.153765,13.672383],[51.153857,13.672263],[51.154012,13.672130],[51.154154,13.672028],[51.154087,13.671862],[51.153972,13.671611],[51.153887,13.671429],[51.153777,13.671158],[51.153672,13.670869],[51.153530,13.670474],[51.153502,13.670396],[51.153477,13.670255],[51.153463,13.670104],[51.153434,13.669454],[51.153412,13.669192],[51.153289,13.668302],[51.153215,13.667891],[51.153115,13.667400],[51.153029,13.667082],[51.152889,13.666668],[51.152792,13.666316],[51.152710,13.666102],[51.152526,13.665713],[51.152017,13.664777],[51.151776,13.664291],[51.151616,13.664007],[51.151440,13.663709],[51.151295,13.663379],[51.151167,13.663028],[51.150972,13.662545],[51.150836,13.662266],[51.150756,13.662089],[51.150722,13.661987],[51.150704,13.661869],[51.150699,13.661711],[51.150719,13.661504],[51.150767,13.661274],[51.150874,13.660861],[51.150953,13.660544],[51.151059,13.660091],[51.151184,13.659536],[51.151288,13.659101],[51.151313,13.658959],[51.151318,13.658865],[51.151295,13.658777],[51.151206,13.658608],[51.151088,13.658447],[51.150992,13.658329],[51.150627,13.657744],[51.150364,13.657334],[51.150194,13.657060],[51.150048,13.656861],[51.149905,13.656703],[51.149799,13.656620],[51.149690,13.656580],[51.149550,13.656644],[51.149313,13.656859],[51.149119,13.656929],[51.148864,13.656929],[51.148717,13.656891],[51.148566,13.656819],[51.148460,13.656714],[51.148396,13.656636],[51.148295,13.656524],[51.148093,13.656336],[51.148041,13.656287],[51.147972,13.656242],[51.147866,13.656218],[51.147802,13.656212],[51.147714,13.656231],[51.147573,13.656325],[51.147472,13.656427],[51.147329,13.656569],[51.147189,13.656679],[51.147053,13.656765],[51.146912,13.656843],[51.146772,13.656918],[51.146621,13.656980],[51.146479,13.657028],[51.146325,13.657068],[51.146180,13.657092],[51.146111,13.657095],[51.146049,13.657081],[51.145931,13.657001],[51.145769,13.656864],[51.145633,13.656738],[51.145369,13.656524],[51.145249,13.656448],[51.145073,13.656360],[51.144980,13.656320],[51.144792,13.656202],[51.144679,13.656127],[51.144593,13.656068],[51.144526,13.656033],[51.144433,13.655990],[51.144383,13.655963],[51.144346,13.655899],[51.144329,13.655861],[51.144265,13.655861],[51.144166,13.655882],[51.144058,13.655966],[51.143955,13.656110],[51.143807,13.656360],[51.143691,13.656550],[51.143570,13.656722],[51.143417,13.656910],[51.143301,13.657047],[51.143227,13.657114],[51.143141,13.657197],[51.142969,13.657320],[51.142796,13.657422],[51.142641,13.657519],[51.142538,13.657578],[51.142363,13.657693],[51.142074,13.657865],[51.141934,13.657948],[51.141840,13.658004],[51.141704,13.658071],[51.141574,13.658122],[51.141467,13.658178],[51.141177,13.658305],[51.141100,13.658369],[51.141031,13.658433],[51.140940,13.658575],[51.140866,13.658747],[51.140792,13.658983],[51.140671,13.659348],[51.140509,13.659841],[51.140425,13.660099],[51.140364,13.660260],[51.140358,13.660281],[51.140445,13.660292],[51.140529,13.660319],[51.140677,13.660330],[51.140832,13.660319],[51.140913,13.660319],[51.141175,13.660372],[51.141377,13.660410],[51.141670,13.660442],[51.141842,13.660415],[51.142056,13.660391],[51.142268,13.660407],[51.142407,13.660464],[51.142641,13.660617],[51.142828,13.660756],[51.142961,13.660850],[51.143026,13.660912],[51.143042,13.660979],[51.143040,13.661051],[51.143025,13.661132],[51.143003,13.661188],[51.142963,13.661287],[51.142888,13.661440],[51.142814,13.661585],[51.142762,13.661684],[51.142673,13.661888],[51.142596,13.662084],[51.142478,13.662344],[51.142389,13.662542],[51.142284,13.662781],[51.142195,13.662985],[51.142108,13.663175],[51.141997,13.663414],[51.141904,13.663583],[51.141817,13.663757],[51.141771,13.663857],[51.141727,13.663967],[51.141700,13.664052],[51.141680,13.664149],[51.141646,13.664289],[51.141596,13.664444],[51.141537,13.664592],[51.141492,13.664735],[51.141445,13.664913],[51.141402,13.665072],[51.141205,13.665089],[51.141015,13.665103],[51.140795,13.665119],[51.140639,13.665128],[51.140243,13.665136],[51.140151,13.665124],[51.140066,13.665100],[51.140017,13.665062],[51.139872,13.664911],[51.139788,13.664802],[51.139735,13.664711],[51.139559,13.664460],[51.139315,13.664138],[51.139086,13.663841],[51.139007,13.663728],[51.138821,13.663830],[51.138707,13.663894],[51.138399,13.663993],[51.138284,13.664026],[51.138264,13.664160],[51.138225,13.664356],[51.138146,13.664530],[51.138069,13.664688],[51.137968,13.664881],[51.137885,13.665050],[51.137818,13.665184],[51.137752,13.665367],[51.137699,13.665544],[51.137635,13.665847],[51.137577,13.666126],[51.137525,13.666405],[51.137505,13.666544],[51.137497,13.666748],[51.137495,13.666949],[51.137492,13.667306],[51.137490,13.667496],[51.137449,13.667757],[51.137431,13.667923],[51.137409,13.668459],[51.137401,13.668875],[51.137391,13.669200],[51.137372,13.669473],[51.137347,13.669658],[51.137295,13.669924],[51.137234,13.670168],[51.137187,13.670366],[51.137123,13.670602],[51.137067,13.670763],[51.137032,13.670860],[51.136968,13.671016],[51.136911,13.671150],[51.136845,13.671292],[51.136716,13.671573],[51.136615,13.671820],[51.136547,13.672013],[51.136477,13.672147],[51.136413,13.672249],[51.136308,13.672416],[51.136251,13.672518],[51.136187,13.672641],[51.136150,13.672700],[51.136137,13.672770],[51.136143,13.672839],[51.136170,13.672915],[51.136218,13.672974],[51.136790,13.673548],[51.137365,13.674132],[51.137786,13.674556],[51.138284,13.675098],[51.138769,13.675570],[51.139429,13.676257],[51.139799,13.676632],[51.140162,13.677008],[51.140731,13.677576],[51.141243,13.678097],[51.141657,13.678526],[51.141845,13.678719],[51.142225,13.679073],[51.142377,13.679207],[51.142549,13.679373],[51.142673,13.679518],[51.142737,13.679582],[51.142653,13.679888],[51.142579,13.680114],[51.142485,13.680425],[51.142400,13.680671],[51.142347,13.680800],[51.142263,13.680988],[51.142162,13.681165],[51.142067,13.681326],[51.142010,13.681444],[51.141943,13.681562],[51.141902,13.681669],[51.141889,13.681760],[51.141519,13.681884],[51.141290,13.681970],[51.140990,13.682066],[51.140758,13.682136],[51.140502,13.682206],[51.139930,13.682415],[51.139523,13.682554],[51.138967,13.682737],[51.138951,13.682967],[51.138877,13.683574],[51.138823,13.683810],[51.138893,13.684056],[51.139011,13.684459],[51.139102,13.684802],[51.139163,13.685054],[51.139206,13.685290],[51.139208,13.685381],[51.139198,13.685528],[51.139169,13.685683],[51.139134,13.685832],[51.139079,13.686031],[51.139027,13.686208],[51.138990,13.686334],[51.138973,13.686403],[51.138951,13.686474],[51.138929,13.686587],[51.138903,13.686745],[51.138891,13.686871],[51.138883,13.686948],[51.138881,13.687070],[51.138885,13.687220],[51.138893,13.687346],[51.138898,13.687428],[51.138914,13.687535],[51.138934,13.687657],[51.138962,13.687778],[51.138996,13.687911],[51.139031,13.688042],[51.139068,13.688170],[51.139103,13.688289],[51.139137,13.688422],[51.139194,13.688628],[51.139239,13.688832],[51.139259,13.688941],[51.139303,13.689161],[51.139321,13.689256],[51.139341,13.689352],[51.139356,13.689456],[51.139382,13.689614],[51.139389,13.689686],[51.139396,13.689774],[51.139416,13.689945],[51.139430,13.690007],[51.139444,13.690097],[51.139466,13.690193],[51.139505,13.690404],[51.139536,13.690523],[51.139568,13.690651],[51.139588,13.690722],[51.139604,13.690787],[51.139625,13.690893],[51.139631,13.691017],[51.139617,13.691186],[51.139588,13.691341],[51.139557,13.691498],[51.139480,13.691867],[51.139442,13.692102],[51.139403,13.692295],[51.139344,13.692606],[51.139319,13.692733],[51.139293,13.692859],[51.139261,13.693016],[51.139210,13.693248],[51.139164,13.693460],[51.139127,13.693613],[51.139071,13.693797],[51.139010,13.693952],[51.138941,13.694180],[51.138856,13.694533],[51.138808,13.694791],[51.138766,13.694974],[51.138734,13.695092],[51.138623,13.695382],[51.138594,13.695456],[51.138453,13.695767],[51.138388,13.695975],[51.138334,13.696193],[51.138248,13.696539],[51.138168,13.696848],[51.138054,13.697357],[51.138038,13.697418],[51.137857,13.698036],[51.137819,13.698155],[51.137725,13.698449],[51.137593,13.699066],[51.137513,13.699440],[51.137453,13.699698],[51.137398,13.699863],[51.137285,13.700130],[51.137237,13.700234],[51.137198,13.700312],[51.137157,13.700349],[51.137130,13.700375],[51.137253,13.700482],[51.137333,13.700572],[51.137396,13.700640],[51.137460,13.700756],[51.137557,13.700898],[51.137750,13.701162],[51.137849,13.701355],[51.137927,13.701617],[51.138049,13.702019],[51.138086,13.702108],[51.138114,13.702200],[51.138272,13.702729],[51.138421,13.703227],[51.138527,13.703564],[51.138684,13.704047],[51.138776,13.704330],[51.138892,13.704685],[51.138973,13.704952],[51.139072,13.705245],[51.139106,13.705384],[51.139141,13.705466],[51.139180,13.705361],[51.139259,13.705147],[51.139320,13.704931],[51.164964,13.679275]
];
var point = [51.166419, 13.690216];

module.exports = {
    name: 'Geo benchmarks',
    maxTime: 2,
    tests: [
        {
            name: 'point in polygon with 756 edges',
            fn: function() {
                jsonOdm.Geo.pointWithinPolygon(point,polygon);
            }
        }
    ]
};