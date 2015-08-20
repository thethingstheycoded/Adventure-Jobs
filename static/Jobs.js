
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
	
	JobStore.loadJobs = function() {
		Job.find(
			{ filter: {order:'createDate DESC', limit:5}},
			function (result) {
				JobStore.jobs = result;
			}
		);
	};
	
	JobStore.loadJobs();

  });
 