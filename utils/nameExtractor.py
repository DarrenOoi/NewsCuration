# requirements:
# $ pip install spacy
# $ python -m spacy download en_core_web_sm
# import spacy
# from datetime import datetime
from inf import transactionDataClient

# english_nlp = spacy.load('en_core_web_sm')

# example_text = '''
# Editor’s Note: David Orentlicher is the Judge Jack and Lulu Lehman Professor at the William S. Boyd School of Law at the University of Nevada, Las Vegas, where he specializes in constitutional law and health law. He also serves as a Democrat in the Nevada Assembly. Eve Hanan is the associate dean of faculty development and research and professor of law at the William S. Boyd School of Law at the University of Nevada, Las Vegas, where she specializes in criminal law and procedure. The views expressed in this commentary are the authors’ own. View more opinion at CNN. Former President Donald Trump’s surrender to the authorities in Georgia Thursday on charges of racketeering, forgery, false statements and other crimes, as well as his three previous arraignments in separate criminal probes, reflects an important reality: Trump allegedly violated the law on many occasions, and he should be held accountable through criminal prosecutions. Indeed, it is essential to bring Trump to justice for his assaults on the electoral process. But prosecutors should not stretch criminal laws in ways that would be unfair to Trump and that would open the door to unwarranted prosecutions of others. Yet that’s what Fulton County District Attorney Fani Willis is doing in Georgia, particularly with her indictment of the former president under the Racketeer Influenced and Corrupt Organizations Act (RICO). Not surprisingly, there are other criminal laws that are straightforward and appropriate to invoke against Trump. (He has denied wrongdoing in all the cases against him.) For example, special counsel Jack Smith was on solid ground when he charged Trump in federal court in June with the mishandling of classified documents after Trump allegedly took documents with sensitive national security information when he left the White House, stored them in unauthorized locations and showed some of them to people who did not have security clearances. He’s pleaded not guilty and cited a range of legal arguments. Similarly, if the allegations behind the election-related counts from Smith and Willis are true, it is appropriate and necessary for Trump to face charges for trying to prevent the counting of people’s votes, influence the testimony of witnesses, present fraudulent slates of electors in Arizona, Georgia, Michigan, Nevada, New Mexico, Pennsylvania and Wisconsin, and engage in other misconduct. But Willis doesn’t stop there, and her invocation of RICO charges in particular raises concerns. Legislatures enacted federal and state racketeering statutes to ensure that prosecutors can effectively dismantle organized crime groups, most notably the Mafia, by criminalizing participation in an “enterprise” with criminal goals. Opinion: Fani Willis is taking a major gamble on the Trump case Because participation in the enterprise is the heart of the crime, conviction of a RICO defendant only hinges on proving that the person took some actions toward the objective of the enterprise. Drawing on the affiliation with a targeted group makes it easier to prosecute individuals whose criminal actions might otherwise be seen as minor. To the extent that participants are charged as co-conspirators, all can be prosecuted for the crimes of their co-conspirators. This makes it easier for prosecutors to go after mob bosses who rely on their underlings to commit their crimes, but also for minor participants to be prosecuted for the crimes of others. But RICO statutes do not limit their definition of “enterprise” to Mafia-like organized crime groups which has unfortunately paved the way for Willis and other prosecutors to bring RICO charges for all kinds of alleged conspiracies. Any group of people, no matter how small, can constitute a RICO criminal enterprise if they conspire together to commit one of the many crimes specified in the RICO statute at the state and federal level. They need not represent an existing group, either. In a 2001 indictment in Miami, for instance, federal prosecutors applied RICO to a pair of union officials who took union funds for personal use. In another controversial case, Willis in 2013 indicted more than 30 school administrators and teachers for cheating on state standardized tests. Though facilitated by legislatures and approved by courts, the expansion of RICO statutes violates a fundamental principle of fairness: Criminal laws must clearly inform people about what they may and may not do. A statute directed against organized crime does not clearly speak to efforts to overturn an election. While Willis and other prosecutors have stretched RICO far beyond its intended role before, this is the first time RICO charges have been brought against a former president, and their use here demonstrates their seemingly limitless bounds. Opinion: He’s been booked. His mug shot has been taken. And incredibly this might not end Donald Trump’s race for the White House Moreover, when RICO is brought into the picture, the claim of a broad criminal enterprise can turn more people into potential defendants – even if they might have done nothing wrong. A suspect doesn’t necessarily have to be a “member” of an alleged enterprise to be accused of participating in the conduct of its affairs. Some defendants may never have realized they were involved with the enterprise, or that the enterprise even existed. In a 2016 New York case, federal prosecutors pursuing a gang swept up 120 suspects, nearly all of whom were indigent, yet did not allege gang membership for nearly half of them. Ultimately, only 69 of the 120 defendants were convicted of violating RICO, and, for 35 of those convicted, the only predicate act of racketeering was the sale of marijuana. This is no surprise: Even among members of street gangs, estimates indicate that only a small minority are involved in crime. Casting a wide net can also raise serious First Amendment issues. To justify her RICO charges against Trump, Willis must point to particular acts by the former president that advanced the alleged criminal enterprise. She must also do the same in a separate RICO case she has brought against rapper Young Thug (Jeffery Lamar Williams) for allegedly founding and participating in a violent street gang, charges that Williams denies. Among the particular acts identified in the cases, Willis cited lyrics from Williams’ songs and the following tweet from Trump: “Georgia hearings now on @OANN. Amazing!” (OANN stands for One America News Network, a right-wing TV network.) Song lyrics and a promotional tweet are not criminal; indeed, they ordinarily count as speech protected by the Constitution. If protected speech can be criminalized in a RICO prosecution, First Amendment freedoms will be eroded. Sign up for CNN Opinion’s new newsletter.Join us on Twitter and Facebook RICO also can turn minor crimes into serious ones, since RICO statutes often raise the penalties for criminal misconduct under the theory that coordinated criminal acts are worse than the same crimes committed by individuals. But criminal law is designed to punish individual, not collective, guilt. In Willis’ case, she has filed multiple charges alleging false statements and writings. Those charges ordinarily carry a prison sentence of one to five years under Georgia law. By using RICO, Willis has given the defendants a potential prison sentence of five to 20 years. This also means that the punishment may no longer fit the crime. Moreover, the prospect of an unduly harsh sentence can lead innocent defendants to plead guilty to a lower sentence. The principle of accountability for Trump is critical, but so is the principle of a fair system of justice. Prosecutors can hold the former president responsible for any serious misconduct without invoking RICO and compromising the principle of fairness that protects us all. Perfectly adequate laws against election fraud, obstruction of an official proceeding, influencing witnesses and other alleged misdeeds by Trump can be employed without setting dangerous precedents or raising questions about the integrity of what is already a politically divisive case. Correction: A previous version of this piece incorrectly stated the number of convictions in a 2016 New York case. © 2023 Cable News Network. A Warner Bros. Discovery Company. All Rights Reserved. CNN Sans ™ & © 2016 Cable News Network.
# '''

# def nameExtractor(text):
#     spacy_parser = english_nlp(text)
#     nameAndAliases = []
#     for entity in spacy_parser.ents:
#         if entity.label_ == "PERSON":
#             nameAndAliases.append(entity)
#     # TODO:
#     # remove double-ups
#     # remove aliases (e.g. John Smith, Mr Smith)
#     # additional testing required
#     return nameAndAliases


def politicianIdExtractorFromDB(argv):
    text, tdcLock, tdc = argv
    text = text.lower().split()
    nameIds = politicianExtractorFromDB(text, tdc, tdcLock)
    unique_ids = [id[0] for id in nameIds.values()]
    print(f"DEBUG: politicianIdExtractorFromDB - {unique_ids}")
    return unique_ids


def politicianNameExtractorFromDB(argv):
    text, tdcLock, tdc = argv
    text = text.lower().split()
    nameIds = politicianExtractorFromDB(text, tdc, tdcLock)
    print(f"DEBUG: politicianNameExtractorFromDB - {list(nameIds.keys())}")
    return list(nameIds.keys())


def politicianExtractorFromDB(text, tdc, tdcLock):
    tdcLock.acquire()
    results = tdc.query("Politician")
    tdcLock.release()

    # Initilise name dictionary
    politicianNames = dict()
    for result in results:
        id = result["ID"]
        fName = result["Fname"].lower()
        lName = result["Lname"].lower()
        if politicianNames.get(fName) != None:
            if politicianNames[fName].get(lName) != None:
                politicianNames[fName][lName].append(id)
            else:
                politicianNames[fName][lName] = [id]
        else:
            politicianNames[fName] = {lName: [id]}

    # name extraction from text
    nameIds = dict()
    for index in range(len(text) - 1):
        if politicianNames.get(text[index]):
            if politicianNames[text[index]].get(text[index + 1]):
                nameIds[text[index] + " " + text[index + 1]] = politicianNames[
                    text[index]
                ][text[index + 1]]

    return nameIds
