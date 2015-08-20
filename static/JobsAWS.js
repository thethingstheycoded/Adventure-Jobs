
// create a new module for this entire app
angular.module('jobsApp', ['lbServices'])

// within that module create a controller for the job postings (will later 
//  need a separate controller for accounts and such)
  .controller('JobStoreController', function(Job) {

	// assign a named variable to this controller for cleaner code
  	var JobStore = this;
	
	JobStore.trackJobLink = function(event, jobID, action) {
		
		event.preventDefault();
		event.stopPropagation();

		// search through the jobs data to find the one that was clicked on
		// make this more efficient than a loop!
		for (var i = 0; i < JobStore.jobs.length; i++) {

			if (JobStore.jobs[i].id == jobID) {
			
				//set a temp variable with this job
				var thisJob = JobStore.jobs[i];
				
				// create the data object with the click event properties
				var jobAction = {
					"event" : action,
					"jobID" : thisJob.id,
					"jobCountry" : thisJob.countryName,
					"jobCompany" : thisJob.companyName,
					"jobTitle" : thisJob.title,
					"keen" : {
						"addons" : [
							{
								"name" : "keen:ip_to_geo",
								"input" : {
									"ip" : "ip_address"
								},
								"output" : "ip_geo_info"
							},
							{
								"name" : "keen:ua_parser",
								"input" : {
									"ua_string" : "user_agent"
								},
								"output" : "parsed_user_agent"
							},
							{
				            	"name" : "keen:referrer_parser",
				                "input" : {
				                    "referrer_url" : "referrer",
				                    "page_url" : "url"
				                },
				                "output" : "referrer_info"
				            }
						]
					},
					"ip_address" : "${keen.ip}",
					"user_agent" : "${keen.user_agent}",
					"referrer" : document.referrer,
					"url" : document.location.href
				};

				// Send it to the "job_action" collection in Keen.io
				keenClient.trackExternalLink(event, 'job_action', jobAction);

	    	break;
			}
		}
    };		
    
    JobStore.takeSegmentAction = function(jobID, action) {
			// search through the jobs data to find the one that was clicked on
			// make this more efficient than a loop!
			for (var i = 0; i < JobStore.jobs.length; i++) {
				if (JobStore.jobs[i].id == jobID) {
				
					//set a temp variable with this job
					var thisJob = JobStore.jobs[i];
					
					//track the click in Segment.io
					analytics.track('job_action', {
							event: action,
							jobID: thisJob.jobID,
							jobCountry: thisJob.countryName,
							jobCompany: thisJob.companyName,
							jobTitle: thisJob.title
					});

					// apply the specific action
					switch(action) {
							case 'Apply':
						    	document.location = thisJob.applyLink;
									break;
							case 'View Job':
									document.location = thisJob.sourceLink;
									break;
							case 'Wikipedia':
									document.location = thisJob.wikiLink;
									break;
							case 'Factbook':
									document.location = thisJob.CIALink;
									break;
							default: //map
									alert('test');
					}	
		    	break;
				}
			}
    };
	
    JobStore.takeKeenAction = function(jobID, action) {
			// search through the jobs data to find the one that was clicked on
			// make this more efficient than a loop!
			for (var i = 0; i < JobStore.jobs.length; i++) {
				if (JobStore.jobs[i].id == jobID) {
				
					//set a temp variable with this job
					var thisJob = JobStore.jobs[i];
					
					// create the data object with the click event properties
					var jobAction = {
						"event" : action,
						"jobID" : thisJob.id,
						"jobCountry" : thisJob.countryName,
						"jobCompany" : thisJob.companyName,
						"jobTitle" : thisJob.title,
						"keen" : {
							"addons" : [
								{
									"name" : "keen:ip_to_geo",
									"input" : {
										"ip" : "ip_address"
									},
									"output" : "ip_geo_info"
								},
								{
									"name" : "keen:ua_parser",
									"input" : {
										"ua_string" : "user_agent"
									},
									"output" : "parsed_user_agent"
								},
								{
					            	"name" : "keen:referrer_parser",
					                "input" : {
					                    "referrer_url" : "referrer",
					                    "page_url" : "url"
					                },
					                "output" : "referrer_info"
					            }
							]
						},
						"ip_address" : "${keen.ip}",
						"user_agent" : "${keen.user_agent}",
						"referrer" : document.referrer,
    					"url" : document.location.href
					};

					// Send it to the "job_action" collection in Keen.io
					// might switch this to click external link:
					// https://github.com/keen/keen-js/blob/master/docs/track.md#track-links-and-forms
					keenClient.addEvent("job_action", jobAction, function(err, res){
						if (err) {
					    	// there was an error!
							alert('error!');
							alert(err);
						}
						// send the user on their way
						switch(action) {
								case 'Apply':
							    	document.location = thisJob.applyLink;
										break;
								case 'View Job':
										document.location = thisJob.sourceLink;
										break;
								case 'Wikipedia':
										document.location = thisJob.wikiLink;
										break;
								case 'Factbook':
										document.location = thisJob.CIALink;
										break;
								default: //map
										alert('test');
						}	
					});

		    	break;
				}
			}
    };
	
	JobStore.jobs = [{"title":"Software Developer","description":"City Pantry are hiring more developers to help move City Pantry from being an operations-powered business to being a tech-powered business, and to shorten the time from idea to execution. Some of the challenges the tech team have recently worked on include: writing algorithms to generate menus for companies based on their preferences; tightly integrating communication between our suppliers, our customers and ourselves via automated SMS messages and emails; and building an API to be the foundation of the company going forward. We offer flexible working times and location - anywhere within a 3-hour difference with the UK. Email us with your CV, and any links or code samples you think would be helpful","sourceLink":"https://news.ycombinator.com/item?id=9639961","applyLink":"https://news.ycombinator.com/item?id=9639961","companyName":"City Pantry","countryName":"United Kingdom","mapLink":"https://goo.gl/maps/hbLhK","wikiLink":"http://en.wikipedia.org/wiki/United_Kingdom","CIALink":"http://www.tripadvisor.com/Tourism-g186216-United_Kingdom-Vacations.html","createDate":"2015-06-10T04:00:00.000Z","expirationDate":"2015-07-09T04:00:00.000Z","doNotDisplay":false,"id":"5578e90f63fb45f6bf2f2cda"},{"title":"Team Software telco","description":"We're the R&D Tech company within a big telco with branches in the Nordics, Eastern Europe and Asia; with ~150 million customers and counting. We're rethinking about how a telco should look like in the 21th century and roll out projects around the globe, so if you'd like to travel there's definitely an opportunity. We're looking to hire a bunch of great software engineers (C++, Java, NodeJS or frontend)","sourceLink":"https://news.ycombinator.com/item?id=9640249","applyLink":"https://www.linkedin.com/jobs2/view/48915513?trk=biz-overview-job-post","companyName":"Telenor Digital","countryName":"Oslo","mapLink":"https://goo.gl/maps/m0lsl","wikiLink":"http://en.wikipedia.org/wiki/Oslo","CIALink":"http://www.tripadvisor.com/Tourism-g190479-Oslo_Eastern_Norway-Vacations.html","createDate":"2015-06-08T04:00:00.000Z","expirationDate":"2015-07-08T04:00:00.000Z","doNotDisplay":false,"id":"objectid"},{"title":"Lead Developer","description":"AgriPlace is currently looking for a Lead Developer to further provide a robust and scalable solution to farmers worldwide. We use Django, ReactJS and PostgreSQL on Linux servers.  AgriPlace is changing the way farm level data is collected, managed and shared in agricultural supply chains. The long-term objective is to become the leading IT platform for farm data exchange and compliance.","sourceLink":"https://news.ycombinator.com/item?id=9659558","applyLink":"mailto:info@agriplace.com","companyName":"AgriPlace","countryName":"Amsterdam","mapLink":"https://goo.gl/maps/Ulcge","wikiLink":"http://en.wikipedia.org/wiki/Amsterdam","CIALink":"http://www.tripadvisor.com/Tourism-g188590-Amsterdam_North_Holland_Province-Vacations.html","createDate":"2015-06-08T04:00:00.000Z","expirationDate":"2015-07-08T04:00:00.000Z","doNotDisplay":false,"id":"55764f5763fb45f6bf2f2cd7"},{"title":"UAV / Drohne Programmer","description":"A young company working in the Geo / Surveying business (typically 3d measuring on big infrastructure projects and mining sites) looking for a mission control developer (Java) or an embedded programmer (C/C++)","sourceLink":"https://news.ycombinator.com/item?id=9644554","applyLink":"mailto:mm@mavinci.de","companyName":"MAVinci","countryName":"Germany","mapLink":"https://goo.gl/maps/7cQCF","wikiLink":"http://en.wikipedia.org/wiki/Germany","CIALink":"http://www.tripadvisor.com/Tourism-g187275-Germany-Vacations.html","createDate":"2015-06-08T04:00:00.000Z","expirationDate":"2015-07-08T04:00:00.000Z","doNotDisplay":false,"id":"5576527063fb45f6bf2f2cd8"},{"title":"full-stack JavaScript developer","description":"Linkurious is hiring in Paris! We are a 5 people startup (4 engineers) looking for a full-stack JavaScript developer to work with us on the future of network visualization tools. ONSITE only, VISA welcome.  Technologies: JavaScript, NodeJS, AngularJS, Sigma.js, Neo4j, ElasticSearch","sourceLink":"https://news.ycombinator.com/item?id=9642686","applyLink":"http://linkurio.us/jobs/","companyName":"Linkurious","countryName":"France","mapLink":"https://goo.gl/maps/G56hk","wikiLink":"http://en.wikipedia.org/wiki/France","CIALink":"http://www.tripadvisor.com/Tourism-g187070-France-Vacations.html","createDate":"2015-06-08T04:00:00.000Z","expirationDate":"2015-07-08T04:00:00.000Z","doNotDisplay":false,"id":"5576541863fb45f6bf2f2cd9"}];

  });
  
 