import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild, } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../../services/user.service';
declare var bootstrap: any;
@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  users: any[] = [];
  currentDate = new Date();  // will store today's date & time
  userForm!: FormGroup;
  contactForm!: FormGroup;
  years = [1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2017, 2018, 2020, 2021, 2022, 2023, 2024, 2025];
  activeYear = 1994;
  chunkedYears: number[][] = [];

  journeyData: any = {
    // 1992: {
    //   title: {
    //     en: "Beginning of Gunthewari Struggle",
    //     mr: "गुंठेवारी संघर्षाची सुरुवात"
    //   },
    //   points: {
    //     en: [
    //       "The early voice of citizens demanding justice for Gunthewari settlements was raised.",
    //       "Initial meetings and mobilization started in different localities.",
    //       "Community leaders came forward to organize the struggle."
    //     ],
    //     mr: [
    //       "गुंठेवारी वसाहतींसाठी न्याय मागणाऱ्या नागरिकांचा पहिला आवाज उठला.",
    //       "विविध भागात प्रारंभीच्या बैठका व संघटन उभारणी सुरू झाली.",
    //       "स्थानिक नेत्यांनी संघर्ष उभारण्यासाठी पुढाकार घेतला."
    //     ]
    //   },
    //   // image: "assets/image/leader-image-1992.jpg"
    //   image: "assets/image/leader-image-1.jpg",
    // },

    // 1993: {
    //   title: {
    //     en: "Mobilization of People",
    //     mr: "जनतेचे संघटन"
    //   },
    //   points: {
    //     en: [
    //       "Large gatherings and protests were organized to press demands.",
    //       "Awareness about Gunthewari injustice spread across the community.",
    //       "Youth and women actively joined the movement."
    //     ],
    //     mr: [
    //       "मागण्यांसाठी मोठी सभासंमेलने व आंदोलने आयोजित केली गेली.",
    //       "गुंठेवारी अन्यायाबाबत जनजागृती पसरली.",
    //       "युवक व महिलांचा सक्रिय सहभाग वाढला."
    //     ]
    //   },
    //   // image: "assets/image/leader-image-1993.jpg"
    //   image: "assets/image/leader-image-1.jpg",
    // },

    1994: {
      title: {
        en: "Strengthening the Organization",
        mr: "संघटनाची मजबुती"
      },
      points: {
        en: [
          "Citizen committees were formed in various wards.",
          "Continuous follow-up with local administration began.",
          "The struggle gained recognition at the municipal level."
        ],
        mr: [
          "विविध प्रभागांमध्ये नागरिक समित्या स्थापन करण्यात आल्या.",
          "स्थानिक प्रशासनाशी सातत्याने पाठपुरावा सुरू झाला.",
          "संघर्षाला महापालिका स्तरावर मान्यता मिळू लागली."
        ]
      },
      // image: "assets/image/leader-image-1994.jpg"
      image: "assets/image/leader-image-1.jpeg",
    },

    1995: {
      title: {
        en: "Wider Political Support",
        mr: "राजकीय पाठिंबा वाढला"
      },
      points: {
        en: [
          "Political leaders began extending support to the movement.",
          "Protests reached state-level attention.",
          "Gunthewari issue became a significant public debate."
        ],
        mr: [
          "राजकीय नेत्यांचा संघर्षाला पाठिंबा मिळू लागला.",
          "आंदोलनाने राज्यस्तरीय लक्ष वेधले.",
          "गुंठेवारी प्रश्न हा मोठा लोकचर्चेचा विषय बनला."
        ]
      },
      // image: "assets/image/leader-image-1995.jpg"
      image: "assets/image/leader-image-1.jpeg",
    },
    1996: {
      title: {
        en: "Foundation of Lokshahi Movement",
        mr: "लोकशाही आंदोलनाची पायाभरणी"
      },
      points: {
        en: [
          "Started political journey with inspiration from socialist ideals.",
          "Raised voice against injustice and corruption.",
          "Focused on empowering the common man through grassroots politics."
        ],
        mr: [
          "समाजवादी विचारसरणीतून राजकीय प्रवासाची सुरुवात.",
          "अन्याय व भ्रष्टाचाराविरुद्ध आवाज उठवला.",
          "सामान्य जनतेला सक्षम बनवण्यासाठी ग्रामपातळीवर कार्यरत."
        ]
      },
      // image: "assets/image/leader-image-1.jpg",
      image: "assets/image/leader-image-1.jpeg",
    },
    1997: {
      title: {
        en: "Building People's Trust",
        mr: "जनतेचा विश्वास जिंकणे"
      },
      points: {
        en: [
          "Strengthened local presence through public welfare activities.",
          "Encouraged youth to participate in political reforms.",
          "Focused on transparency in local governance."
        ],
        mr: [
          "जनकल्याणकारी उपक्रमातून स्थानिक पातळीवर आपली छाप पाडली.",
          "तरुणांना राजकीय सुधारणांमध्ये सहभागी होण्यासाठी प्रोत्साहित केले.",
          "स्थानिक स्वराज्यात पारदर्शकतेवर भर दिला."
        ]
      },
      image: "assets/image/leader-image-1.jpeg",
    },
    1998: {
      title: {
        en: "Joining Shiv Sena",
        mr: "शिवसेनेत प्रवेश"
      },
      points: {
        en: [
          "In 1998, Chandandada Chavan entered Shiv Sena.",
          "Started active work in Sangli district.",
          "Focused on raising issues of common people."
        ],
        mr: [
          "१९९८ मध्ये चंदनदादा चव्हाण यांनी शिवसेनेत प्रवेश केला.",
          "सांगली जिल्ह्यात सक्रिय कामास सुरुवात केली.",
          "सामान्य जनतेचे प्रश्न मांडण्यावर भर दिला."
        ]
      },
      // image: "assets/image/leader-image-1998.jpg"
      image: "assets/image/leader-image-1.jpeg",
    },
    1999: {
      title: {
        en: "Social Campaigns",
        mr: "सामाजिक मोहिमा"
      },
      points: {
        en: [
          "Continued grassroots campaigns in rural areas.",
          "Organized awareness drives for farmers and workers.",
          "Built a strong public connect through social initiatives."
        ],
        mr: [
          "१९९९ मध्ये ग्रामीण भागात जनजागृती मोहिमा सुरू ठेवल्या.",
          "शेतकरी व कामगारांसाठी जनजागृती कार्यक्रम आयोजित केले.",
          "सामाजिक उपक्रमांमुळे जनतेशी दृढ नाते निर्माण केले."
        ]
      },
      // image: "assets/image/leader-image-1999.jpg"
      image: "assets/image/leader-image-1.jpeg",
    },
    2000: {
      title: {
        en: "Leadership in Development Committee",
        mr: "विकास समितीतील नेतृत्व"
      },
      points: {
        en: [
          "Appointed in Gundewari Vikas Committee.",
          "Worked on bringing local development issues to the forefront.",
          "Started initiatives to resolve problems in Sangli region."
        ],
        mr: [
          "गुंडेवारी विकास समितीत नेतेपदाची जबाबदारी मिळाली.",
          "स्थानिक विकासाचे प्रश्न पुढे आणण्यासाठी प्रयत्न केले.",
          "सांगली विभागातील प्रश्न सोडवण्यासाठी उपक्रम सुरू केले."
        ]
      },
      // image: "assets/image/leader-image-2000.jpg"
      image: "assets/image/leader-image-1.jpeg",
    },
    2001: {
      title: {
        en: "Voice Against Unfair Proposals",
        mr: "अन्यायकारक प्रस्तावांविरुद्ध आवाज"
      },
      points: {
        en: [
          "Chandan Chavan opposed unfair government land measurement proposals.",
          "Highlighted the injustice caused to common citizens due to unauthorized layouts.",
          "Brought people’s voice to state authorities."
        ],
        mr: [
          "चंदन चव्हाण यांनी अन्यायकारक गुंठेवारी प्रस्ताव व शासकीय मोजणीविरुद्ध आवाज उठवला.",
          "अनधिकृत प्रस्थावांमुळे सामान्य नागरिकांचे होणारे नुकसान अधोरेखित केले.",
          "जनतेचा आवाज राज्य शासनापर्यंत पोहोचवला."
        ]
      },
      // image: "assets/image/leader-image-2001.jpg"
      image: "assets/image/leader-image-1.jpeg",
    },
    2002: {
      title: {
        en: "Fighting for Public Rights",
        mr: "जनतेच्या हक्कांसाठी लढा"
      },
      points: {
        en: [
          "Organized public meetings to spread awareness about land issues.",
          "Worked to protect farmers’ and plot holders’ rights.",
          "Stood firmly against corruption in land approvals."
        ],
        mr: [
          "जमिनीशी संबंधित प्रश्नांवर जनजागृती करण्यासाठी सार्वजनिक सभा घेतल्या.",
          "शेतकरी व भूखंडधारकांच्या हक्कांचे रक्षण करण्याचे काम केले.",
          "जमीन मंजुरीतील भ्रष्टाचाराविरुद्ध ठामपणे उभे राहिले."
        ]
      },
      // image: "assets/image/leader-image-2002.jpg"
      image: "assets/image/leader-image-1.jpeg",

    },
    2003: {
      title: {
        en: "Mass Protests for Justice",
        mr: "न्यायासाठी जनआंदोलन"
      },
      points: {
        en: [
          "Led agitations demanding cancellation of unjust proposals.",
          "Mobilized citizens for collective protests.",
          "Built pressure on government to reconsider policies."
        ],
        mr: [
          "अन्यायकारक प्रस्ताव रद्द करण्यासाठी आंदोलनांचे नेतृत्व केले.",
          "सामूहिक आंदोलने करण्यासाठी नागरिकांना संघटित केले.",
          "शासनावर धोरणांचा पुनर्विचार करण्यासाठी दबाव आणला."
        ]
      },
      // image: "assets/image/leader-image-2003.jpg"
      image: "assets/image/leader-image-1.jpeg",
    },
    2004: {
      title: {
        en: "Recognition as People’s Leader",
        mr: "जनतेचा खरा नेता म्हणून ओळख"
      },
      points: {
        en: [
          "Earned recognition as a strong voice for people’s land rights.",
          "Expanded political influence across Sangli district.",
          "Became a trusted leader for farmers and the poor."
        ],
        mr: [
          "जमिनीच्या हक्कांसाठी आवाज उठवणारे म्हणून जनतेमध्ये ओळख निर्माण केली.",
          "सांगली जिल्ह्यात राजकीय प्रभाव वाढवला.",
          "शेतकरी व गरीब वर्गासाठी विश्वासार्ह नेता बनले."
        ]
      },
      // image: "assets/image/leader-image-2004.jpg"
      image: "assets/image/leader-image-1.jpeg",
    },
    2005: {
      title: {
        en: "Strengthening Leadership",
        mr: "नेतृत्व बळकट करण्याचा काळ"
      },
      points: {
        en: [
          "Strengthened role in Shiv Sena through people’s struggles.",
          "Focused on social justice and rural development.",
          "Laid foundation for future state-level leadership."
        ],
        mr: [
          "जनतेच्या लढ्यांमुळे शिवसेनेतील आपले नेतृत्व अधिक बळकट केले.",
          "सामाजिक न्याय व ग्रामीण विकासावर लक्ष केंद्रित केले.",
          "भविष्यातील राज्यस्तरीय नेतृत्वासाठी पायाभरणी केली."
        ]
      },
      // image: "assets/image/leader-image-2005.jpg"
      image: "assets/image/leader-image-1.jpeg",
    },
    2006: {
      title: {
        en: "Fight for Gunthewari Residents",
        mr: "गुंठेवारी रहिवाशांसाठी लढा"
      },
      points: {
        en: [
          "Raised strong voice for Gunthewari residents’ rights.",
          "Opposed unfair municipal actions that affected families.",
          "Promised to take the issue to higher authorities."
        ],
        mr: [
          "गुंठेवारी रहिवाशांच्या हक्कांसाठी ठाम आवाज उठवला.",
          "महानगरपालिकेच्या अन्यायकारक कारवाईला विरोध केला.",
          "हा प्रश्न उच्चस्तरीय अधिकार्‍यांकडे नेण्याचे आश्वासन दिले."
        ]
      },
      // image: "assets/image/leader-image-2006.jpg"
      image: "assets/image/leader-image-1.jpeg",
    },
    2007: {
      title: {
        en: "Legal Battle for Justice",
        mr: "न्यायासाठी न्यायालयीन लढा"
      },
      points: {
        en: [
          "Prepared to file public interest litigation in Bombay High Court.",
          "Focused on bringing permanent solution for Gunthewari residents.",
          "Mobilized public support for legal fight."
        ],
        mr: [
          "मुंबई उच्च न्यायालयात जनहित याचिका दाखल करण्याची तयारी केली.",
          "गुंठेवारी रहिवाशांसाठी कायमस्वरूपी तोडगा काढण्यावर भर दिला.",
          "न्यायालयीन लढ्यासाठी लोकांचा पाठिंबा उभारला."
        ]
      },
      // image: "assets/image/leader-image-2007.jpg"
      image: "assets/image/leader-image-1.jpeg",
    },
    2008: {
      title: {
        en: "Public Interest Petition Filed",
        mr: "जनहित याचिका दाखल"
      },
      points: {
        en: [
          "Filed a PIL in Bombay High Court (Case No. 2003) seeking justice for residents.",
          "Demanded cancellation of unfair surveys and relief for citizens.",
          "Brought issue of lakhs of affected families to the state’s attention."
        ],
        mr: [
          "मुंबई उच्च न्यायालयात (केस नं. 2003) जनहित याचिका दाखल केली.",
          "अन्यायकारक मोजणी रद्द करून नागरिकांना दिलासा द्यावा अशी मागणी केली.",
          "लाखो प्रभावित कुटुंबांचा प्रश्न राज्याच्या दृष्टीस आणला."
        ]
      },
      // image: "assets/image/leader-image-2008.jpg"
      image: "assets/image/leader-image-1.jpeg",
    },
    2009: {
      title: {
        en: "Beginning of Development Work",
        mr: "विकासकामांची सुरुवात"
      },
      points: {
        en: [
          "Initiated road and drainage development in Gunthewari areas.",
          "Ensured water and electricity supply to neglected households.",
          "Mobilized funds for infrastructure improvement."
        ],
        mr: [
          "गुंठेवारी भागात रस्ते व नाले बांधकामाची सुरुवात केली.",
          "पाणी व वीजपुरवठा घराघरात पोचवला.",
          "पायाभूत सुविधा उभारणीसाठी निधी उपलब्ध करून दिला."
        ]
      },
      // image: "assets/image/leader-image-2009.jpg"
      image: "assets/image/leader-image-1.jpeg",
    },
    2010: {
      title: {
        en: "Strong Shiv Sena Support",
        mr: "शिवसेनेचा ठाम पाठिंबा"
      },
      points: {
        en: [
          "Shiv Sena extended full support to Gunthewari residents.",
          "Campaigns and meetings were held to spread awareness.",
          "Focused on creating equal rights for urban poor."
        ],
        mr: [
          "शिवसेनेने गुंठेवारी रहिवाशांना ठाम पाठिंबा दिला.",
          "जागरूकता निर्माण करण्यासाठी सभा व मोर्चे आयोजित केले.",
          "शहरी गरीबांना समान हक्क मिळवून देण्यावर भर दिला."
        ]
      },
      // image: "assets/image/leader-image-2010.jpg"
      image: "assets/image/leader-image-1.jpeg",
    },
    2011: {
      title: {
        en: "Infrastructure Progress",
        mr: "पायाभूत सुविधांचा प्रगतीवेग"
      },
      points: {
        en: [
          "Several colonies benefited from new concrete roads.",
          "Proper drainage and sewage system development completed.",
          "Schools and public facilities received attention."
        ],
        mr: [
          "अनेक वसाहतींना काँक्रीट रस्त्यांचा लाभ मिळाला.",
          "योग्य नाले व गटार व्यवस्था उभारणी पूर्ण झाली.",
          "शाळा व सार्वजनिक सोयींवर विशेष लक्ष दिले."
        ]
      },
      // image: "assets/image/leader-image-2011.jpg"
      image: "assets/image/leader-image-1.jpeg",
    },
    2012: {
      title: {
        en: "Trust of People Strengthened",
        mr: "जनतेचा विश्वास दृढ"
      },
      points: {
        en: [
          "By 2012, large sections of Gunthewari residents trusted Shiv Sena leadership.",
          "Chandan Dada became a strong symbol of hope for regularization & development.",
          "Movement for permanent recognition gained momentum."
        ],
        mr: [
          "२०१२ पर्यंत गुंठेवारी रहिवाशांचा विश्वास शिवसेना नेतृत्वावर दृढ झाला.",
          "चंदनदादा नियमितीकरण व विकासाचे आशेचे प्रतीक बनले.",
          "कायमस्वरूपी मान्यता मिळविण्याच्या आंदोलनाला गती मिळाली."
        ]
      },
      // image: "assets/image/leader-image-2012.jpg"
      image: "assets/image/leader-image-1.jpeg",
    },
    2013: {
      title: {
        en: "Youth Kept Away from Elections",
        mr: "निवडणुकीतून युवावर्ग दूर ठेवला"
      },
      points: {
        en: [
          "Former MLA Avdhut Wagh alleged that youth were intentionally sidelined in elections.",
          "Raised concerns about lack of opportunities for new leadership.",
          "Highlighted the importance of youth participation in democracy."
        ],
        mr: [
          "माजी आमदार अवधूत वाघ यांनी युवावर्गाला निवडणुकीतून जाणीवपूर्वक दूर ठेवले असा आरोप केला.",
          "नवीन नेतृत्वाला संधी न दिल्याबद्दल चिंता व्यक्त केली.",
          "लोकशाहीत युवावर्गाच्या सहभागाचे महत्व अधोरेखित केले."
        ]
      },
      // image: "assets/image/leader-image-2013.jpg"
      image: "assets/image/leader-image-1.jpeg",
    },
    2014: {
      title: {
        en: "Call for Youth Empowerment",
        mr: "युवक सक्षमीकरणाची हाक"
      },
      points: {
        en: [
          "Emphasis on bringing youth to the forefront of political and social change.",
          "Advocated for policies to support young leaders in development.",
          "Demanded fair representation for youth in decision-making bodies."
        ],
        mr: [
          "राजकीय व सामाजिक बदलामध्ये युवांना अग्रस्थानी आणण्यावर भर दिला.",
          "तरुण नेतृत्वाला चालना देण्यासाठी धोरणांची मागणी केली.",
          "निर्णय प्रक्रियेत युवांना योग्य प्रतिनिधित्व मिळावे अशी मागणी केली."
        ]
      },
      // image: "assets/image/leader-image-2014.jpg"
      image: "assets/image/leader-image-1.jpeg",
    },
    2015: {
      title: {
        en: "Clarification in Shiv Sena Meeting",
        mr: "शिवसेना बैठकीत भूमिका स्पष्ट"
      },
      points: {
        en: [
          "Chandan Dada Chavan clarified his stand during the Shiv Sena Gunthewari Committee meeting.",
          "Meeting focused on addressing key concerns of Gunthewari residents.",
          "Strengthened organizational unity and direction for future struggles."
        ],
        mr: [
          "शिवसेना गुंठेवारी समितीच्या बैठकीत चंदनदादा चव्हाण यांनी आपली भूमिका स्पष्ट केली.",
          "गुंठेवारी रहिवाशांच्या प्रमुख समस्यांवर चर्चा झाली.",
          "भविष्यातील लढ्यासाठी संघटनात्मक एकी अधिक दृढ झाली."
        ]
      },
      // image: "assets/image/leader-image-2015.jpg"
      image: "assets/image/leader-image-1.jpeg",
    },
    2016: {
      title: {
        en: "Commitment to Gunthewari Residents",
        mr: "गुंठेवारी रहिवाशांसाठी वचनबद्धता"
      },
      points: {
        en: [
          "Reaffirmed the promise to fight for permanent recognition of Gunthewari settlements.",
          "Mobilized people through local meetings and awareness drives.",
          "Gained strong support from youth and senior citizens alike."
        ],
        mr: [
          "गुंठेवारी वसाहतींना कायम मान्यता मिळवून देण्याचे आश्वासन पुन्हा दृढ केले.",
          "स्थानिक बैठका व जनजागृती मोहिमेद्वारे लोकांना एकत्र केले.",
          "युवक व ज्येष्ठ नागरिकांकडून प्रचंड पाठिंबा मिळाला."
        ]
      },
      // image: "assets/image/leader-image-2016.jpg"
      image: "assets/image/leader-image-1.jpeg",
    },
    2017: {
      title: {
        en: "Struggles Intensify",
        mr: "लढा तीव्र झाला"
      },
      points: {
        en: [
          "Protests and agitations intensified for regularization of settlements.",
          "Leadership became a strong voice for marginalized residents.",
          "Media and political circles started acknowledging the struggle."
        ],
        mr: [
          "नियमितीकरणासाठी आंदोलन व लढा अधिक तीव्र झाला.",
          "वंचित रहिवाशांचा आवाज बनून नेतृत्व पुढे आले.",
          "माध्यमे व राजकीय वर्तुळांनी या लढ्याची दखल घेण्यास सुरुवात केली."
        ]
      },
      // image: "assets/image/leader-image-2017.jpg"
      image: "assets/image/leader-image-1.jpeg",
    },
    2018: {
      title: {
        en: "Path Towards Recognition",
        mr: "मान्यतेकडे वाटचाल"
      },
      points: {
        en: [
          "Discussions with officials and leaders moved towards concrete solutions.",
          "Community unity reached new heights with larger gatherings.",
          "Set the stage for future success in securing recognition."
        ],
        mr: [
          "अधिकारी व नेत्यांबरोबरच्या चर्चेत ठोस तोडग्याकडे वाटचाल झाली.",
          "मोठ्या मेळाव्यांमुळे समाजाची एकता शिखरावर पोहोचली.",
          "कायम मान्यता मिळविण्यासाठी भविष्यातील यशाचा पाया रचला गेला."
        ]
      },
      // image: "assets/image/leader-image-2018.jpg"
      image: "assets/image/leader-image-1.jpeg",
    },
    2019: {
      title: {
        en: 'Support During Pandemic',
        mr: 'संकट काळात मदतीचा हात'
      },
      points: {
        en: [
          'Provided food and medical aid during COVID-19.',
          'Mobilized volunteers for sanitization drives.'
        ],
        mr: [
          'कोविड काळात अन्न व वैद्यकीय मदत पुरवली.',
          'स्वयंसेवकांच्या माध्यमातून सॅनिटायझेशन मोहिमा राबवल्या.'
        ]
      },
      image: "assets/image/leader-image-1.jpeg",
    },
    2020: {
      title: {
        en: "Struggle for Flood-Affected Traders",
        mr: "पूरग्रस्त व्यापाऱ्यांसाठी लढा"
      },
      points: {
        en: [
          "Raised voice for rehabilitation of flood-affected traders.",
          "Highlighted issues in local meetings and protests.",
          "Built solidarity among affected business communities."
        ],
        mr: [
          "पूरग्रस्त व्यापाऱ्यांच्या पुनर्वसनासाठी आवाज उठविला.",
          "स्थानिक बैठका व आंदोलनांतून समस्या अधोरेखित केल्या.",
          "व्यापारी बांधवांमध्ये एकजूट निर्माण केली."
        ]
      },
      // image: "assets/image/leader-image-2019.jpg"
      image: "assets/image/leader-image-1.jpeg",
    },
    2021: {
      title: {
        en: "Return to Normalcy Demand",
        mr: "पूरग्रस्त व्यापाऱ्यांस पूर्वपरिस्थित आणावे : चंदनदास"
      },
      points: {
        en: [
          "Chandan Dada demanded quick return to normalcy for flood-affected traders.",
          "Emphasized need for financial relief and support packages.",
          "Strengthened coordination with administration for rehabilitation."
        ],
        mr: [
          "पूरग्रस्त व्यापाऱ्यांना पूर्वपरिस्थितीत आणण्याची मागणी चंदनदादा यांनी केली.",
          "आर्थिक मदत व सहाय्य पॅकेजची गरज अधोरेखित केली.",
          "पुनर्वसनासाठी प्रशासनाशी समन्वय अधिक बळकट केला."
        ]
      },
      // image: "assets/image/leader-image-2020.jpg"
      image: "assets/image/leader-image-1.jpeg",
    },
    2022: {
      title: {
        en: "Acceptance of Gunthewari Struggle Committee Demands",
        mr: "गुंठेवारी बचाव संघर्ष समितीच्या मागण्या मान्य"
      },
      points: {
        en: [
          "District officials accepted the demands presented by the Gunthewari Struggle Committee.",
          "Memorandum submitted to authorities highlighting urgent issues faced by Gunthewari residents.",
          "Strong leadership ensured the voice of common citizens was heard at the administrative level."
        ],
        mr: [
          "गुंठेवारी बचाव संघर्ष समितीच्या मागण्या जिल्हाधिकारी यांनी मान्य केल्या.",
          "गुंठेवारी रहिवाशांच्या तातडीच्या समस्या अधोरेखित करणारे निवेदन अधिकाऱ्यांना सादर केले.",
          "सामान्य नागरिकांचा आवाज प्रशासनापर्यंत पोहोचवण्यात नेतृत्वाने महत्त्वाची भूमिका बजावली."
        ]
      },
      // image: "assets/image/leader-image-2021.jpg"
      image: "assets/image/leader-image-1.jpeg",
    },
    2023: {
      title: {
        en: "Strengthening the Struggle",
        mr: "संघर्ष अधिक मजबूत"
      },
      points: {
        en: [
          "Follow-up meetings held to ensure implementation of accepted demands.",
          "Community participation and unity increased through awareness drives.",
          "Momentum of the Gunthewari movement carried forward with greater determination."
        ],
        mr: [
          "मान्य झालेल्या मागण्यांची अंमलबजावणी व्हावी यासाठी पुढील बैठका आयोजित केल्या.",
          "जागरूकता मोहिमेद्वारे समाजाचा सहभाग आणि एकी अधिक दृढ झाली.",
          "गुंठेवारी आंदोलनाचा वेग अधिक जोमाने पुढे नेण्यात आला."
        ]
      },
      // image: "assets/image/leader-image-2022.jpg"
      image: "assets/image/leader-image-1.jpeg",
    },
    2024: {
      title: {
        en: "Welfare Camps for Citizens",
        mr: "नागरिकांसाठी कल्याणकारी शिबिरे"
      },
      points: {
        en: [
          "Special camps organized for issuing Gunthewari certificates.",
          "Thousands of residents benefited from simplified procedures.",
          "Increased public trust through transparent administration."
        ],
        mr: [
          "गुंठेवारी प्रमाणपत्र वितरणासाठी विशेष शिबिरे आयोजित केली.",
          "सोप्या प्रक्रियेमुळे हजारो रहिवाशांना लाभ झाला.",
          "पारदर्शक प्रशासनामुळे जनतेचा विश्वास अधिक दृढ झाला."
        ]
      },
      // image: "assets/image/leader-image-2024.jpg"
      image: "assets/image/leader-image-1.jpeg",
    },

    2025: {
      title: {
        en: "Major Relief for Gunthewari Citizens",
        mr: "गुंठेवारी नागरिकांसाठी मोठा दिलासा"
      },
      points: {
        en: [
          "Further relaxation in certification and map approval process.",
          "Strong political will ensured justice for affected families.",
          "Movement achieved long-term impact for community welfare."
        ],
        mr: [
          "प्रमाणपत्र व नकाशा मंजुरी प्रक्रियेत आणखी शिथिलता देण्यात आली.",
          "दृढ राजकीय इच्छाशक्तीमुळे प्रभावित कुटुंबांना न्याय मिळाला.",
          "आंदोलनामुळे समाजकल्याणासाठी दीर्घकालीन परिणाम साध्य झाले."
        ]
      },
      // image: "assets/image/leader-image-2025.jpg"
      image: "assets/image/leader-image-1.jpeg",
    }
  };

  joinContent = {
    heading: {
      en: 'JOIN THE JOURNEY',
      mr: 'या प्रवासात सहभागी व्हा'
    },
    subheading: {
      en: 'Be the change you want to see.',
      mr: 'तुम्हाला हवा असलेला बदल तुम्हीच व्हा.'
    },
    joinLine: {
      en: 'JOIN <span class="text-orange">JAY HIND SENA</span>',
      mr: '<span class="text-orange">जय हिंद सेना</span> मध्ये सामील व्हा'
    },
    paragraph: {
      en: `Jay Hind Sena is a movement working for the upliftment of the common man and the national interest.
         Become a part of this journey and contribute to the making of New India.`,
      mr: `जय हिंद सेना ही एक अशी चळवळ आहे जी सर्वसामान्य माणसाच्या विकासासाठी आणि देशहितासाठी काम करते.
         या प्रवासाचा भाग व्हा आणि नवभारताच्या निर्मितीत तुमचे योगदान द्या.`
    },
    becomeMemberBtn: {
      en: 'BECOME A MEMBER',
      mr: 'सदस्य बना'
    },
    donateBtn: {
      en: 'MAKE A DONATION',
      mr: 'देणगी द्या'
    }
  };

  leaders = [
    {
      id: 1,
      image: 'assets/image/leader-image-1.jpeg',
      title: {
        en: 'Shri. Chandan Dada Chavan',
        mr: 'श्री. चंदनदादा चव्हाण'
      },
      subtitle: {
        en: 'Party Chief.',
        mr: 'पक्षप्रमुख .'
      },
      paragraphs: [
        {
          en: 'Land holders in "Gunthawari" do not require a new law to have their names added to the 7/12 extract – Shri Chandan Dada Chavan.',
          mr: 'गुंठेवारी धारकांना ७/१२ वर नावे लागण्यासाठी नव्या कायद्याची गरज नाही – चंदनदादा चव्हाण.'
        },
        {
          en: 'In Maharashtra’s political landscape, Shri Chandan Dada Chavan stands as a dedicated leader with a deep connection to the people.',
          mr: 'महाराष्ट्राच्या राजकीय क्षेत्रात श्री. चंदनदादा चव्हाण हे जनतेशी घट्ट नातं ठेवणारे समर्पित नेते म्हणून उभे आहेत.'
        }
      ]
    },
    {
      id: 2,
      image: 'assets/image/chandandada-daughter.jpg',
      title: {
        en: 'Shri. Ranjit Chavan',
        mr: 'श्री. रणजीत चव्हाण'
      },
      subtitle: {
        en: 'Youth Leader',
        mr: 'युवा प्रमुख'
      },
      paragraphs: [
        {
          en: 'Ranjit Chavan represents the new generation of leadership with fresh ideas and a strong will to serve the people.',
          mr: 'रणजीत चव्हाण हे जनतेची सेवा करण्याची तीव्र इच्छा आणि नवे विचार असलेले नवे पिढीतील नेते आहेत.'
        }
      ]
    },
    {
      id: 3,
      image: 'assets/image/dr.abdullmnanshaikh.jpeg',
      title: {
        en: 'Dr.Abdul Mannan Shaikh',
        mr: 'डॉ.अब्दुल मन्नान शेख'
      },
      subtitle: {
        en: 'Key Leader & State Spokeperson',
        mr: 'प्रमुख नेते / राज्य प्रवक्ते'
      },
      paragraphs: [
        {
          en: 'Dedicated to organizational growth and welfare initiatives.',
          mr: 'संघटनाच्या वाढीसाठी आणि कल्याणकारी उपक्रमांसाठी समर्पित.'
        }
      ]
    },
    {
      id: 4,
      image: 'assets/image/Milind Inamdar.jpeg',
      title: {
        en: 'Milind Inamdar',
        mr: 'मिलिंद इनामदार'
      },
      subtitle: {
        en: 'Deputy Head of State (direct descendant of Veer Sidnak)',
        mr: 'राज्य उपप्रमुख(वीर सिदनाक वंशज)'
      },
      paragraphs: [
        {
          en: 'Playing a vital role in strengthening the foundation of Jai Hind Sena.',
          mr: 'जय हिंद सेनेची पायाभरणी मजबूत करण्यामध्ये महत्त्वपूर्ण भूमिका.'
        }
      ]
    }
  ];


  tweets = [
    {
      name: 'Jay Hind Sena',
      handle: 'jayhindsenaonline',
      caption: 'जय हिंद सेना 2025 में',
      avatar: 'assets/image/logo.png',
      thumbnail: 'assets/image/news-vedio-img/news-vedio-1-img.png',
      time: '8:31 PM · Aug 7, 2024',
      likes: 465,
      replies: '30'
    },
    {
      name: 'Jay Hind Sena',
      handle: 'jayhindsenaonline',
      avatar: 'assets/image/logo.png',
      caption: 'जय हिंद सेना दलों से कैसे अलग होगा?',
      thumbnail: 'assets/image/news-vedio-img/news-vedio-1-img.png',
      time: '7:07 PM · Aug 7, 2024',
      likes: 232,
      replies: '14'
    },
    {
      name: 'Jay Hind Sena',
      handle: 'jayhindsenaonline',
      caption: 'जय हिंद सेना 2025 में',
      avatar: 'assets/image/logo.png',
      thumbnail: 'assets/image/news-vedio-img/news-vedio-1-img.png',
      time: '7:00 AM · Aug 7, 2024',
      likes: 264,
      replies: '5'
    }
  ];

  activeData = this.journeyData[this.activeYear];
  activeFilter = 'All';
  filters = ['All', 'Sabha', 'Melava', 'Events'];

  gallery = [

    { url: 'assets/image/gallery-images/gallery-image-26.jpg', category: 'Sabha' },
    { url: 'assets/image/gallery-images/gallery-image-28.jpg', category: 'Sabha' },
    { url: 'assets/image/gallery-images/gallery-image-29.jpg', category: 'Sabha' },
    { url: 'assets/image/gallery-images/gallery-image-32.jpg', category: 'Sabha' },
    { url: 'assets/image/gallery-images/gallery-image-4.jpg', category: 'Sabha' },
    { url: 'assets/image/gallery-images/gallery-image-5.jpg', category: 'Sabha' },

    { url: 'assets/image/gallery-images/gallery-image-6.jpg', category: 'Events' },
    { url: 'assets/image/gallery-images/gallery-image-7.jpg', category: 'Melava' },
    { url: 'assets/image/gallery-images/gallery-image-1.jpg', category: 'Sabha' },
    { url: 'assets/image/gallery-images/gallery-image-10.jpg', category: 'Sabha' },
    { url: 'assets/image/gallery-images/gallery-image-11.jpg', category: 'Sabha' },
    { url: 'assets/image/gallery-images/gallery-image-12.jpg', category: 'Sabha' },
    { url: 'assets/image/gallery-images/gallery-image-13.jpg', category: 'Sabha' },
    { url: 'assets/image/gallery-images/gallery-image-20.jpg', category: 'Sabha' },

    { url: 'assets/image/gallery-images/gallery-image-22.jpg', category: 'Events' },
    { url: 'assets/image/gallery-images/gallery-image-21.jpg', category: 'Events' },
    { url: 'assets/image/gallery-images/gallery-image-15.jpg', category: 'Events' },
    { url: 'assets/image/gallery-images/gallery-image-16.jpg', category: 'Events' },
    { url: 'assets/image/gallery-images/gallery-image-17.jpg', category: 'Events' },
    { url: 'assets/image/gallery-images/gallery-image-18.jpg', category: 'Events' },

    { url: 'assets/image/gallery-images/gallery-image-19.jpg', category: 'Melava' },
    { url: 'assets/image/gallery-images/gallery-image-23.jpg', category: 'Melava' },
    { url: 'assets/image/gallery-images/gallery-image-30.jpg', category: 'Melava' },
    { url: 'assets/image/gallery-images/gallery-image-31.jpg', category: 'Melava' },
    { url: 'assets/image/gallery-images/gallery-image-25.jpg', category: 'Melava' },

  ];

  pressVideos = [
    {
      title: {
        en: 'Press Conference',
        mr: 'प्रेस वार्ता'
      },
      thumbnail: 'assets/image/news-vedio-img/news-vedio-1-img.png',
      videoUrl: 'assets/image/videos/vedio-5.mp4'
    },
    {
      title: {
        en: 'Media Interaction',
        mr: 'मीडिया संवाद'
      },
      thumbnail: 'assets/image/news-vedio-img/news-vedio-1-img.png',
      videoUrl: 'assets/image/videos/video-3.mp4'
    },
    {
      title: {
        en: 'Public Address',
        mr: 'जनतेशी संवाद'
      },
      thumbnail: 'assets/image/news-vedio-img/news-vedio-1-img.png',
      videoUrl: 'assets/image/videos/video-1.mp4'
    }
  ];

  newsVideos = [
    {
      title: {
        en: 'What’s the difference in advice between Owaisi and Prashant Kishor to Muslims?',
        mr: 'मुसलमानों को ओवैसी और प्रशांत किशोर की सलाह में क्या फर्क है?'
      },
      thumbnail: 'assets/image/news-vedio-img/news-vedio-1-img.png',
      videoUrl: 'assets/image/news-videos/news-vedio-1.mp4'
    },
    {
      title: {
        en: 'Truth of leaders’ claims on government jobs?',
        mr: 'सरकारी नौकरी पर नेताओं के दावे का सच?'
      },
      thumbnail: 'assets/image/news-vedio-img/news-vedio-1-img.png',
      videoUrl: 'assets/image/news-videos/news-vedio-2.mp4'
    },
    {
      title: {
        en: '3 ways to escape poverty?',
        mr: 'गरीबी से निकलने के 3 रास्ते?'
      },
      thumbnail: 'assets/image/news-vedio-img/news-vedio-1-img.png',
      videoUrl: 'assets/image/news-videos/news-vedio-3.mp4'
    },
    {
      title: {
        en: 'When your child doesn’t study...',
        mr: 'जब आपका लड़का पढ़ नहीं रहा...'
      },
      thumbnail: 'assets/image/news-vedio-img/news-vedio-1-img.png',
      videoUrl: 'assets/image/news-videos/news-vedio-4.mp4'
    },
    {
      title: {
        en: 'Where did 40,000 crore get spent?',
        mr: '40 हजार करोड़ खर्च किस पर?'
      },
      thumbnail: 'assets/image/news-vedio-img/news-vedio-1-img.png',
      videoUrl: 'assets/image/news-videos/news-vedio-5.mp4'
    },
    {
      title: {
        en: 'When your child doesn’t study...',
        mr: 'जब आपका लड़का पढ़ नहीं रहा...'
      },
      thumbnail: 'assets/image/news-vedio-img/news-vedio-1-img.png',
      videoUrl: 'assets/image/news-videos/news-vedio-6.mp4'
    },
    {
      title: {
        en: 'When your child doesn’t study...',
        mr: 'जब आपका लड़का पढ़ नहीं रहा...'
      },
      thumbnail: 'assets/image/news-vedio-img/news-vedio-1-img.png',
      videoUrl: 'assets/image/news-videos/news-vedio-7.mp4'
    },
    {
      title: {
        en: 'When your child doesn’t study...',
        mr: 'जब आपका लड़का पढ़ नहीं रहा...'
      },
      thumbnail: 'assets/image/news-vedio-img/news-vedio-1-img.png',
      videoUrl: 'assets/image/news-videos/news-vedio-8.mp4'
    },
    {
      title: {
        en: 'When your child doesn’t study...',
        mr: 'जब आपका लड़का पढ़ नहीं रहा...'
      },
      thumbnail: 'assets/image/news-vedio-img/news-vedio-1-img.png',
      videoUrl: 'assets/image/news-videos/news-vedio-9.mp4'
    },
    {
      title: {
        en: 'When your child doesn’t study...',
        mr: 'जब आपका लड़का पढ़ नहीं रहा...'
      },
      thumbnail: 'assets/image/news-vedio-img/news-vedio-1-img.png',
      videoUrl: 'assets/image/news-videos/news-vedio-10.mp4'
    }
  ];

  newsMediaHeading = {
    en: 'News Media',
    mr: 'न्यूज़ मीडिया'
  };

  getVideoList: any[] = [];

  selectedLang: 'en' | 'mr' = 'en'; // or dynamically detect/set

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.currentVideoUrl = '';
    this.contactForm = this.fb.group({
      subject: [''],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.getVideos();

    this.userForm = this.fb.group({
      username: [''],
      password: ['']
    });

    const storedLang = localStorage.getItem('lang') as 'en' | 'mr';
    if (storedLang) {
      this.selectedLang = storedLang;
    }

    const chunkSize = 6; // number of years per slide
    for (let i = 0; i < this.years.length; i += chunkSize) {
      this.chunkedYears.push(this.years.slice(i, i + chunkSize));
    }
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.userService.postpassDataApi(this.contactForm.value).subscribe({
        next: () => {

          Swal.fire('Success', 'Message sent successfully!', 'success');
          // this.contactForm.reset();
        },
        error: (err) => {
          const message = err?.error?.message || 'Something went wrong.';
          Swal.fire('Error', message, 'error');
        }
      });
      this.contactForm.reset();
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  getVideos() {
    this.userService.getDataApi('/fetch-video.php').subscribe({
      next: (res: any) => {
        this.getVideoList = res;
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      }
    });
  }

  toggleLanguage() {
    this.selectedLang = this.selectedLang === 'en' ? 'mr' : 'en';
    localStorage.setItem('lang', this.selectedLang);
    location.reload(); // Refresh to re-render text if needed
  }

  activeSection = 'home';
  isJoinVisible = false;
  onSectionChange(sectionId: any) {
    this.activeSection = sectionId;

    if (sectionId === 'join-member') {
      this.isJoinVisible = true;   // trigger animation when visible
    } else {
      this.isJoinVisible = false;  // ❓ reset if you want animation again
    }
  }

  selectYear(year: number) {
    this.activeYear = year;
    this.activeData = this.journeyData[year];
  }

  @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef;


  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({
      left: -200,
      behavior: 'smooth'
    });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({
      left: 200,
      behavior: 'smooth'
    });
  }


  setFilter(filter: string) {
    this.activeFilter = filter;
  }

  get filteredGallery() {
    if (this.activeFilter === 'All') return this.gallery;
    return this.gallery.filter(item => item.category === this.activeFilter);
  }

  // openVideo(url: string) {
  //   window.open(url, '_blank');
  // }

  // playVideo(url: string) {
  //   window.location.href = url; // Opens in same tab
  // }

  openNewsVideo(url: string) {
    window.open(url, '_blank');
  }

  //     openNewsVideo(url: string) {
  //   window.open(url, '_self'); // Opens in the same tab
  // }

  downloadPdf() {
    const link = document.createElement('a');
    link.href = 'assets/image/jay-hind-sena.pdf';
    link.download = 'jay-hind-sena.pdf';
    link.click();
  }


  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  currentVideoUrl: string = '';
  playVideo(url: string) {
    this.currentVideoUrl = url;
    const modal = new bootstrap.Modal(document.getElementById('videoModal')!);
    modal.show();

    setTimeout(() => {
      if (this.videoPlayer?.nativeElement) {
        this.videoPlayer.nativeElement.load();
        this.videoPlayer.nativeElement.play();
      }
    }, 300);
  }

  isScrolled = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Add scrolled class after 50px
    this.isScrolled = window.scrollY > 50;
  }

}
