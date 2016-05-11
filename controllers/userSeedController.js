// REQUIREMENTS
var express = require('express');
var router = express.Router();
var User = require('../models/users.js');

var newUser = [{"imglink":"http://dummyimage.com/300x300.png/ff4444/ffffff","gender":"Female","firstName":"Norma","lastName":"Carroll","email":"ncarroll0@chicagotribune.com","password":"password","age":42,"about":"a libero nam dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat varius integer ac leo pellentesque"},
{"imglink":"http://dummyimage.com/300x300.png/5fa2dd/ffffff","gender":"Male","firstName":"Timothy","lastName":"Mills","email":"tmills1@wufoo.com","password":"password","age":27,"about":"felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem"},
{"imglink":"http://dummyimage.com/300x300.png/ff4444/ffffff","gender":"Female","firstName":"Emily","lastName":"Thomas","email":"ethomas2@gravatar.com","password":"password","age":26,"about":"ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac nulla sed vel enim sit amet"},
{"imglink":"http://dummyimage.com/300x300.png/5fa2dd/ffffff","gender":"Female","firstName":"Tina","lastName":"Bennett","email":"tbennett3@eventbrite.com","password":"password","age":40,"about":"eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas"},
{"imglink":"http://dummyimage.com/300x300.png/5fa2dd/ffffff","gender":"Male","firstName":"Jimmy","lastName":"Lawson","email":"jlawson4@liveinternet.ru","password":"password","age":38,"about":"est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam"},
{"imglink":"http://dummyimage.com/300x300.png/5fa2dd/ffffff","gender":"Male","firstName":"Charles","lastName":"Dixon","email":"cdixon5@unesco.org","password":"password","age":22,"about":"vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in"},
{"imglink":"http://dummyimage.com/300x300.png/dddddd/000000","gender":"Female","firstName":"Ann","lastName":"Richardson","email":"arichardson6@nba.com","password":"password","age":32,"about":"risus auctor sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in"},
{"imglink":"http://dummyimage.com/300x300.png/cc0000/ffffff","gender":"Male","firstName":"Jeremy","lastName":"Olson","email":"jolson7@cmu.edu","password":"password","age":42,"about":"quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate"},
{"imglink":"http://dummyimage.com/300x300.png/cc0000/ffffff","gender":"Male","firstName":"Mark","lastName":"Little","email":"mlittle8@howstuffworks.com","password":"password","age":44,"about":"porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in"},
{"imglink":"http://dummyimage.com/300x300.png/5fa2dd/ffffff","gender":"Male","firstName":"Roy","lastName":"Roberts","email":"rroberts9@themeforest.net","password":"password","age":28,"about":"morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas leo"},
{"imglink":"http://dummyimage.com/300x300.png/cc0000/ffffff","gender":"Female","firstName":"Melissa","lastName":"Dunn","email":"mdunna@mashable.com","password":"password","age":41,"about":"in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam"},
{"imglink":"http://dummyimage.com/300x300.png/5fa2dd/ffffff","gender":"Male","firstName":"Howard","lastName":"Collins","email":"hcollinsb@nsw.gov.au","password":"password","age":51,"about":"urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt"},
{"imglink":"http://dummyimage.com/300x300.png/ff4444/ffffff","gender":"Male","firstName":"Craig","lastName":"Berry","email":"cberryc@theguardian.com","password":"password","age":23,"about":"sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu"},
{"imglink":"http://dummyimage.com/300x300.png/5fa2dd/ffffff","gender":"Female","firstName":"Frances","lastName":"Sanchez","email":"fsanchezd@ask.com","password":"password","age":37,"about":"ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin"},
{"imglink":"http://dummyimage.com/300x300.png/5fa2dd/ffffff","gender":"Male","firstName":"Jimmy","lastName":"Moreno","email":"jmorenoe@ovh.net","password":"password","age":35,"about":"non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis ac nibh fusce lacus purus aliquet at"},
{"imglink":"http://dummyimage.com/300x300.png/5fa2dd/ffffff","gender":"Female","firstName":"Linda","lastName":"Dixon","email":"ldixonf@goo.ne.jp","password":"password","age":53,"about":"semper sapien a libero nam dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat varius"},
{"imglink":"http://dummyimage.com/300x300.png/5fa2dd/ffffff","gender":"Male","firstName":"Craig","lastName":"Sims","email":"csimsg@hp.com","password":"password","age":35,"about":"at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non"},
{"imglink":"http://dummyimage.com/300x300.png/dddddd/000000","gender":"Male","firstName":"Jerry","lastName":"Gomez","email":"jgomezh@youtube.com","password":"password","age":29,"about":"mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero"},
{"imglink":"http://dummyimage.com/300x300.png/5fa2dd/ffffff","gender":"Female","firstName":"Virginia","lastName":"Wilson","email":"vwilsoni@hostgator.com","password":"password","age":31,"about":"fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi eu"},
{"imglink":"http://dummyimage.com/300x300.png/ff4444/ffffff","gender":"Female","firstName":"Ruby","lastName":"Woods","email":"rwoodsj@psu.edu","password":"password","age":41,"about":"in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa id lobortis convallis tortor"},
{"imglink":"http://dummyimage.com/300x300.png/dddddd/000000","gender":"Female","firstName":"Stephanie","lastName":"Perez","email":"sperezk@t-online.de","password":"password","age":35,"about":"felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem"},
{"imglink":"http://dummyimage.com/300x300.png/5fa2dd/ffffff","gender":"Female","firstName":"Jacqueline","lastName":"Boyd","email":"jboydl@gravatar.com","password":"password","age":25,"about":"vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio"},
{"imglink":"http://dummyimage.com/300x300.png/ff4444/ffffff","gender":"Female","firstName":"Paula","lastName":"Mcdonald","email":"pmcdonaldm@bizjournals.com","password":"password","age":49,"about":"vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit"},
{"imglink":"http://dummyimage.com/300x300.png/5fa2dd/ffffff","gender":"Male","firstName":"Ralph","lastName":"Evans","email":"revansn@simplemachines.org","password":"password","age":32,"about":"non mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem"},
{"imglink":"http://dummyimage.com/300x300.png/5fa2dd/ffffff","gender":"Female","firstName":"Martha","lastName":"Austin","email":"maustino@japanpost.jp","password":"password","age":25,"about":"in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices"},
{"imglink":"http://dummyimage.com/300x300.png/cc0000/ffffff","gender":"Female","firstName":"Julie","lastName":"Greene","email":"jgreenep@fotki.com","password":"password","age":40,"about":"ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis"},
{"imglink":"http://dummyimage.com/300x300.png/ff4444/ffffff","gender":"Male","firstName":"John","lastName":"Mccoy","email":"jmccoyq@livejournal.com","password":"password","age":42,"about":"convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere"},
{"imglink":"http://dummyimage.com/300x300.png/ff4444/ffffff","gender":"Male","firstName":"Jeremy","lastName":"Elliott","email":"jelliottr@newyorker.com","password":"password","age":48,"about":"aliquet maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique"},
{"imglink":"http://dummyimage.com/300x300.png/cc0000/ffffff","gender":"Female","firstName":"Catherine","lastName":"Butler","email":"cbutlers@go.com","password":"password","age":28,"about":"libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla"},
{"imglink":"http://dummyimage.com/300x300.png/5fa2dd/ffffff","gender":"Male","firstName":"Michael","lastName":"Jackson","email":"mjacksont@1688.com","password":"password","age":46,"about":"scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor"},
{"imglink":"http://dummyimage.com/300x300.png/dddddd/000000","gender":"Male","firstName":"Craig","lastName":"Miller","email":"cmilleru@dot.gov","password":"password","age":54,"about":"id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris"},
{"imglink":"http://dummyimage.com/300x300.png/cc0000/ffffff","gender":"Female","firstName":"Anna","lastName":"Warren","email":"awarrenv@reverbnation.com","password":"password","age":47,"about":"accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis"},
{"imglink":"http://dummyimage.com/300x300.png/cc0000/ffffff","gender":"Female","firstName":"Julia","lastName":"Sims","email":"jsimsw@weibo.com","password":"password","age":36,"about":"fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac"},
{"imglink":"http://dummyimage.com/300x300.png/5fa2dd/ffffff","gender":"Female","firstName":"Frances","lastName":"Marshall","email":"fmarshallx@cbc.ca","password":"password","age":38,"about":"lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet sem"},
{"imglink":"http://dummyimage.com/300x300.png/5fa2dd/ffffff","gender":"Female","firstName":"Jane","lastName":"Kennedy","email":"jkennedyy@hexun.com","password":"password","age":42,"about":"potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam"},
{"imglink":"http://dummyimage.com/300x300.png/dddddd/000000","gender":"Female","firstName":"Patricia","lastName":"Henderson","email":"phendersonz@army.mil","password":"password","age":55,"about":"quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra"},
{"imglink":"http://dummyimage.com/300x300.png/dddddd/000000","gender":"Female","firstName":"Marilyn","lastName":"Ortiz","email":"mortiz10@biblegateway.com","password":"password","age":31,"about":"elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus"},
{"imglink":"http://dummyimage.com/300x300.png/cc0000/ffffff","gender":"Male","firstName":"Fred","lastName":"Little","email":"flittle11@mysql.com","password":"password","age":53,"about":"convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae"},
{"imglink":"http://dummyimage.com/300x300.png/ff4444/ffffff","gender":"Male","firstName":"Andrew","lastName":"Phillips","email":"aphillips12@nsw.gov.au","password":"password","age":41,"about":"rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque"},
{"imglink":"http://dummyimage.com/300x300.png/cc0000/ffffff","gender":"Male","firstName":"Martin","lastName":"Peterson","email":"mpeterson13@slashdot.org","password":"password","age":26,"about":"velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget"},
{"imglink":"http://dummyimage.com/300x300.png/cc0000/ffffff","gender":"Male","firstName":"Antonio","lastName":"Ramirez","email":"aramirez14@msn.com","password":"password","age":30,"about":"sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus"},
{"imglink":"http://dummyimage.com/300x300.png/dddddd/000000","gender":"Male","firstName":"Brandon","lastName":"Mendoza","email":"bmendoza15@privacy.gov.au","password":"password","age":48,"about":"quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus"},
{"imglink":"http://dummyimage.com/300x300.png/ff4444/ffffff","gender":"Male","firstName":"Peter","lastName":"Carpenter","email":"pcarpenter16@vk.com","password":"password","age":41,"about":"posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia"},
{"imglink":"http://dummyimage.com/300x300.png/5fa2dd/ffffff","gender":"Male","firstName":"Joseph","lastName":"Harvey","email":"jharvey17@technorati.com","password":"password","age":40,"about":"orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat eleifend donec ut dolor morbi"},
{"imglink":"http://dummyimage.com/300x300.png/ff4444/ffffff","gender":"Female","firstName":"Sara","lastName":"Hamilton","email":"shamilton18@army.mil","password":"password","age":44,"about":"erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan"},
{"imglink":"http://dummyimage.com/300x300.png/cc0000/ffffff","gender":"Male","firstName":"Shawn","lastName":"Hawkins","email":"shawkins19@va.gov","password":"password","age":28,"about":"montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio"},
{"imglink":"http://dummyimage.com/300x300.png/cc0000/ffffff","gender":"Female","firstName":"Judith","lastName":"Lewis","email":"jlewis1a@yandex.ru","password":"password","age":32,"about":"rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend"},
{"imglink":"http://dummyimage.com/300x300.png/dddddd/000000","gender":"Female","firstName":"Michelle","lastName":"West","email":"mwest1b@icio.us","password":"password","age":45,"about":"quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam"},
{"imglink":"http://dummyimage.com/300x300.png/dddddd/000000","gender":"Male","firstName":"Thomas","lastName":"Lawrence","email":"tlawrence1c@hibu.com","password":"password","age":51,"about":"penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet"},
{"imglink":"http://dummyimage.com/300x300.png/dddddd/000000","gender":"Male","firstName":"Jonathan","lastName":"Thompson","email":"jthompson1d@edublogs.org","password":"password","age":45,"about":"sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus sit"},
{"imglink":"http://dummyimage.com/300x300.png/dddddd/000000","gender":"Female","firstName":"Christine","lastName":"Day","email":"cday1e@vk.com","password":"password","age":48,"about":"in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque viverra"},
{"imglink":"http://dummyimage.com/300x300.png/dddddd/000000","gender":"Female","firstName":"Kathleen","lastName":"Day","email":"kday1f@ox.ac.uk","password":"password","age":32,"about":"lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id"},
{"imglink":"http://dummyimage.com/300x300.png/ff4444/ffffff","gender":"Male","firstName":"Gregory","lastName":"Hudson","email":"ghudson1g@list-manage.com","password":"password","age":34,"about":"curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus"},
{"imglink":"http://dummyimage.com/300x300.png/cc0000/ffffff","gender":"Female","firstName":"Sandra","lastName":"Young","email":"syoung1h@livejournal.com","password":"password","age":39,"about":"luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis"},
{"imglink":"http://dummyimage.com/300x300.png/dddddd/000000","gender":"Male","firstName":"Stephen","lastName":"Myers","email":"smyers1i@eventbrite.com","password":"password","age":31,"about":"elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in felis donec semper sapien a libero nam"},
{"imglink":"http://dummyimage.com/300x300.png/ff4444/ffffff","gender":"Female","firstName":"Maria","lastName":"Nelson","email":"mnelson1j@com.com","password":"password","age":29,"about":"nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non"},
{"imglink":"http://dummyimage.com/300x300.png/dddddd/000000","gender":"Female","firstName":"Tammy","lastName":"Armstrong","email":"tarmstrong1k@icio.us","password":"password","age":40,"about":"a ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed"},
{"imglink":"http://dummyimage.com/300x300.png/ff4444/ffffff","gender":"Male","firstName":"Anthony","lastName":"Lopez","email":"alopez1l@indiatimes.com","password":"password","age":28,"about":"dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit"},
{"imglink":"http://dummyimage.com/300x300.png/5fa2dd/ffffff","gender":"Male","firstName":"Daniel","lastName":"Hicks","email":"dhicks1m@facebook.com","password":"password","age":32,"about":"lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio"},
{"imglink":"http://dummyimage.com/300x300.png/5fa2dd/ffffff","gender":"Female","firstName":"Virginia","lastName":"Larson","email":"vlarson1n@slideshare.net","password":"password","age":43,"about":"luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam augue"},
{"imglink":"http://dummyimage.com/300x300.png/ff4444/ffffff","gender":"Female","firstName":"Rachel","lastName":"Castillo","email":"rcastillo1o@youku.com","password":"password","age":33,"about":"in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in"},
{"imglink":"http://dummyimage.com/300x300.png/5fa2dd/ffffff","gender":"Male","firstName":"George","lastName":"Gonzales","email":"ggonzales1p@auda.org.au","password":"password","age":25,"about":"metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum"},
{"imglink":"http://dummyimage.com/300x300.png/5fa2dd/ffffff","gender":"Male","firstName":"Craig","lastName":"Fields","email":"cfields1q@cmu.edu","password":"password","age":38,"about":"in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at"},
{"imglink":"http://dummyimage.com/300x300.png/ff4444/ffffff","gender":"Female","firstName":"Tina","lastName":"Bishop","email":"tbishop1r@sogou.com","password":"password","age":49,"about":"in est risus auctor sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis"},
{"imglink":"http://dummyimage.com/300x300.png/5fa2dd/ffffff","gender":"Male","firstName":"Christopher","lastName":"Boyd","email":"cboyd1s@unblog.fr","password":"password","age":30,"about":"id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac"},
{"imglink":"http://dummyimage.com/300x300.png/5fa2dd/ffffff","gender":"Male","firstName":"Jose","lastName":"Owens","email":"jowens1t@seattletimes.com","password":"password","age":50,"about":"sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue"},
{"imglink":"http://dummyimage.com/300x300.png/cc0000/ffffff","gender":"Female","firstName":"Cheryl","lastName":"Nguyen","email":"cnguyen1u@geocities.com","password":"password","age":32,"about":"pretium quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque"},
{"imglink":"http://dummyimage.com/300x300.png/ff4444/ffffff","gender":"Female","firstName":"Donna","lastName":"Tucker","email":"dtucker1v@elpais.com","password":"password","age":34,"about":"purus phasellus in felis donec semper sapien a libero nam dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut"},
{"imglink":"http://dummyimage.com/300x300.png/dddddd/000000","gender":"Male","firstName":"Peter","lastName":"Powell","email":"ppowell1w@cdc.gov","password":"password","age":46,"about":"luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis"},
{"imglink":"http://dummyimage.com/300x300.png/dddddd/000000","gender":"Female","firstName":"Tina","lastName":"Garza","email":"tgarza1x@wisc.edu","password":"password","age":21,"about":"vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in felis donec semper sapien"},
{"imglink":"http://dummyimage.com/300x300.png/ff4444/ffffff","gender":"Female","firstName":"Christine","lastName":"Webb","email":"cwebb1y@theatlantic.com","password":"password","age":39,"about":"montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum"},
{"imglink":"http://dummyimage.com/300x300.png/dddddd/000000","gender":"Male","firstName":"Gregory","lastName":"Robertson","email":"grobertson1z@jiathis.com","password":"password","age":51,"about":"lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo"},
{"imglink":"http://dummyimage.com/300x300.png/5fa2dd/ffffff","gender":"Female","firstName":"Linda","lastName":"Hicks","email":"lhicks20@photobucket.com","password":"password","age":49,"about":"at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum"},
{"imglink":"http://dummyimage.com/300x300.png/5fa2dd/ffffff","gender":"Male","firstName":"Harold","lastName":"Bell","email":"hbell21@shop-pro.jp","password":"password","age":33,"about":"tempus semper est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra"},
{"imglink":"http://dummyimage.com/300x300.png/ff4444/ffffff","gender":"Male","firstName":"Jesse","lastName":"Hamilton","email":"jhamilton22@freewebs.com","password":"password","age":21,"about":"rutrum nulla nunc purus phasellus in felis donec semper sapien a libero nam dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor"},
{"imglink":"http://dummyimage.com/300x300.png/cc0000/ffffff","gender":"Male","firstName":"Andrew","lastName":"Hunter","email":"ahunter23@about.com","password":"password","age":42,"about":"phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing"},
{"imglink":"http://dummyimage.com/300x300.png/ff4444/ffffff","gender":"Male","firstName":"Harold","lastName":"Myers","email":"hmyers24@cloudflare.com","password":"password","age":26,"about":"vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque"},
{"imglink":"http://dummyimage.com/300x300.png/dddddd/000000","gender":"Male","firstName":"Dennis","lastName":"Coleman","email":"dcoleman25@comcast.net","password":"password","age":32,"about":"ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla"},
{"imglink":"http://dummyimage.com/300x300.png/cc0000/ffffff","gender":"Male","firstName":"Raymond","lastName":"Burke","email":"rburke26@mlb.com","password":"password","age":33,"about":"neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis ac nibh fusce"},
{"imglink":"http://dummyimage.com/300x300.png/5fa2dd/ffffff","gender":"Male","firstName":"Bruce","lastName":"Lewis","email":"blewis27@foxnews.com","password":"password","age":52,"about":"non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta"},
{"imglink":"http://dummyimage.com/300x300.png/dddddd/000000","gender":"Female","firstName":"Christina","lastName":"Allen","email":"callen28@stanford.edu","password":"password","age":33,"about":"iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque"},
{"imglink":"http://dummyimage.com/300x300.png/5fa2dd/ffffff","gender":"Male","firstName":"Steve","lastName":"Black","email":"sblack29@fastcompany.com","password":"password","age":29,"about":"curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet"},
{"imglink":"http://dummyimage.com/300x300.png/dddddd/000000","gender":"Female","firstName":"Judy","lastName":"Mason","email":"jmason2a@clickbank.net","password":"password","age":41,"about":"nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci"},
{"imglink":"http://dummyimage.com/300x300.png/dddddd/000000","gender":"Female","firstName":"Frances","lastName":"Hanson","email":"fhanson2b@live.com","password":"password","age":54,"about":"in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit"},
{"imglink":"http://dummyimage.com/300x300.png/ff4444/ffffff","gender":"Male","firstName":"Adam","lastName":"Gilbert","email":"agilbert2c@illinois.edu","password":"password","age":39,"about":"vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget"},
{"imglink":"http://dummyimage.com/300x300.png/cc0000/ffffff","gender":"Female","firstName":"Diana","lastName":"Larson","email":"dlarson2d@indiegogo.com","password":"password","age":22,"about":"libero nam dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat varius integer ac leo pellentesque"},
{"imglink":"http://dummyimage.com/300x300.png/cc0000/ffffff","gender":"Female","firstName":"Marilyn","lastName":"Russell","email":"mrussell2e@wordpress.com","password":"password","age":31,"about":"mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec"},
{"imglink":"http://dummyimage.com/300x300.png/cc0000/ffffff","gender":"Female","firstName":"Joan","lastName":"Dixon","email":"jdixon2f@ftc.gov","password":"password","age":49,"about":"justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac"},
{"imglink":"http://dummyimage.com/300x300.png/cc0000/ffffff","gender":"Female","firstName":"Virginia","lastName":"Crawford","email":"vcrawford2g@fc2.com","password":"password","age":30,"about":"turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia sapien"},
{"imglink":"http://dummyimage.com/300x300.png/cc0000/ffffff","gender":"Female","firstName":"Katherine","lastName":"Harvey","email":"kharvey2h@yellowpages.com","password":"password","age":46,"about":"maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac"},
{"imglink":"http://dummyimage.com/300x300.png/dddddd/000000","gender":"Female","firstName":"Lillian","lastName":"Rivera","email":"lrivera2i@macromedia.com","password":"password","age":50,"about":"ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum"},
{"imglink":"http://dummyimage.com/300x300.png/ff4444/ffffff","gender":"Male","firstName":"Ralph","lastName":"Carr","email":"rcarr2j@bbb.org","password":"password","age":38,"about":"aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam"},
{"imglink":"http://dummyimage.com/300x300.png/5fa2dd/ffffff","gender":"Female","firstName":"Anna","lastName":"Coleman","email":"acoleman2k@cafepress.com","password":"password","age":22,"about":"vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse"},
{"imglink":"http://dummyimage.com/300x300.png/ff4444/ffffff","gender":"Male","firstName":"William","lastName":"Larson","email":"wlarson2l@latimes.com","password":"password","age":37,"about":"orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet"},
{"imglink":"http://dummyimage.com/300x300.png/5fa2dd/ffffff","gender":"Male","firstName":"Arthur","lastName":"Knight","email":"aknight2m@accuweather.com","password":"password","age":29,"about":"mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien"},
{"imglink":"http://dummyimage.com/300x300.png/dddddd/000000","gender":"Female","firstName":"Rose","lastName":"Stewart","email":"rstewart2n@accuweather.com","password":"password","age":53,"about":"consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam"},
{"imglink":"http://dummyimage.com/300x300.png/cc0000/ffffff","gender":"Male","firstName":"James","lastName":"Mitchell","email":"jmitchell2o@businessinsider.com","password":"password","age":22,"about":"aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit"},
{"imglink":"http://dummyimage.com/300x300.png/dddddd/000000","gender":"Female","firstName":"Janice","lastName":"Rice","email":"jrice2p@bing.com","password":"password","age":46,"about":"quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in"},
{"imglink":"http://dummyimage.com/300x300.png/5fa2dd/ffffff","gender":"Male","firstName":"Donald","lastName":"Romero","email":"dromero2q@live.com","password":"password","age":50,"about":"maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas"},
{"imglink":"http://dummyimage.com/300x300.png/5fa2dd/ffffff","gender":"Male","firstName":"Carlos","lastName":"Williams","email":"cwilliams2r@imdb.com","password":"password","age":35,"about":"blandit mi in porttitor pede justo eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse platea dictumst"},
{"imglink":"http://dummyimage.com/300x300.png/cc0000/ffffff","gender":"Male","firstName":"Russell","lastName":"Gonzales","email":"rgonzales2s@netlog.com","password":"password","age":26,"about":"rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in"},
{"imglink":"http://dummyimage.com/300x300.png/5fa2dd/ffffff","gender":"Female","firstName":"Jane","lastName":"Robinson","email":"jrobinson2t@a8.net","password":"password","age":27,"about":"accumsan odio curabitur convallis duis consequat dui nec nisi volutpat eleifend donec ut dolor morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum"},
{"imglink":"http://dummyimage.com/300x300.png/5fa2dd/ffffff","gender":"Female","firstName":"Melissa","lastName":"Greene","email":"mgreene2u@prnewswire.com","password":"password","age":44,"about":"duis at velit eu est congue elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum"},
{"imglink":"http://dummyimage.com/300x300.png/cc0000/ffffff","gender":"Female","firstName":"Anne","lastName":"Sanchez","email":"asanchez2v@amazon.com","password":"password","age":45,"about":"congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus"},
{"imglink":"http://dummyimage.com/300x300.png/cc0000/ffffff","gender":"Female","firstName":"Cheryl","lastName":"Fowler","email":"cfowler2w@so-net.ne.jp","password":"password","age":42,"about":"imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus"},
{"imglink":"http://dummyimage.com/300x300.png/ff4444/ffffff","gender":"Male","firstName":"Aaron","lastName":"Jenkins","email":"ajenkins2x@tumblr.com","password":"password","age":51,"about":"ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla"}];

var newUser = [];

// SEEDING
router.get('/', function(req, res){
  User.create(newUser, function(err){
    if (err){
      console.log(err);
      res.send('Error seeding database');
    } else {
      console.log('Seed completed');
      res.redirect('/');
    }
  });
});

// EXPORTING
module.exports = router;
