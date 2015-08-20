var client = new Keen({
  projectId: "55497ea359949a631b429ea9",
  readKey: "1704893614677ae13b86e4a75285b576bfa6c67e04955e4f15710a77e3ad91c5ea1835548fb6e246152e04397644e697cc96cac03f3e7da238c548219e06cc4c6895ca3b087c29c26bf323facb5f634dc782be72b6aeb9e9c3dffc4ff8108c1623eb14a9a7fd8c0061db45dd0893c56b"
});

Keen.ready(function(){


  // ----------------------------------------
  // Pageviews Area Chart
  // ----------------------------------------
  var pageviews_timeline = new Keen.Query("count", {
    eventCollection: "Loaded a Page",
    interval: "hourly",
    groupBy: "parsed_user_agent.browser.family",
    timeframe: "previous_24_hours"
  });
  client.draw(pageviews_timeline, document.getElementById("chart-01"), {
    chartType: "areachart",
    title: false,
    height: 250,
    width: "auto",
    chartOptions: {
      chartArea: {
        height: "85%",
        left: "5%",
        top: "5%",
        width: "80%"
      },
      isStacked: true
    }
  });


  // ----------------------------------------
  // Pageviews Pie Chart
  // ----------------------------------------
  var pageviews_static = new Keen.Query("count", {
    eventCollection: "Loaded a Page",
    groupBy: "parsed_user_agent.browser.family",
    timeframe: "previous_7_days"
  });
  client.draw(pageviews_static, document.getElementById("chart-02"), {
    chartType: "piechart",
    title: false,
    height: 250,
    width: "auto",
    chartOptions: {
      chartArea: {
        height: "85%",
        left: "5%",
        top: "5%",
        width: "100%"
      },
      pieHole: .4
    }
  });


  // ----------------------------------------
  // View Job timeline
  // ----------------------------------------
  var impressions_timeline = new Keen.Query("count", {
    eventCollection: "job_action",
    groupBy: "jobTitle",
    interval: "hourly",
    timeframe: "this_24_hours",
    filters: [
        {
          "property_name" : "event",
          "operator" : "eq",
          "property_value" : "View Job" 
        }
    ]
  });
  client.draw(impressions_timeline, document.getElementById("chart-03"), {
    chartType: "columnchart",
    title: false,
    height: 250,
    width: "auto",
    chartOptions: {
      chartArea: {
        height: "75%",
        left: "10%",
        top: "5%",
        width: "60%"
      },
      bar: {
        groupWidth: "85%"
      },
      isStacked: true
    }
  });


  // ----------------------------------------
  // Apply Job timeline
  // ----------------------------------------
  var impressions_timeline_by_device = new Keen.Query("count", {
    eventCollection: "job_action",
    groupBy: "jobTitle",
    interval: "hourly",
    timeframe: "this_24_hours",
    filters: [
        {
          "property_name" : "event",
          "operator" : "eq",
          "property_value" : "Apply" 
        }
    ]
  });
  client.draw(impressions_timeline_by_device, document.getElementById("chart-04"), {
    chartType: "columnchart",
    title: false,
    height: 250,
    width: "auto",
    chartOptions: {
      chartArea: {
        height: "75%",
        left: "10%",
        top: "5%",
        width: "60%"
      },
      bar: {
        groupWidth: "85%"
      },
      isStacked: true
    }
  });


  // ----------------------------------------
  // Pageviews by state
  // ----------------------------------------
  var impressions_timeline_by_country = new Keen.Query("count", {
    eventCollection: "Loaded a Page",
    groupBy: "ip_geo_info.province",
    interval: "hourly",
    timeframe: "this_24_hours",
  });
  client.draw(impressions_timeline_by_country, document.getElementById("chart-05"), {
    chartType: "columnchart",
    title: false,
    height: 250,
    width: "auto",
    chartOptions: {
      chartArea: {
        height: "75%",
        left: "10%",
        top: "5%",
        width: "60%"
      },
      bar: {
        groupWidth: "85%"
      },
      isStacked: true
    }
  });


  // ----------------------------------------
  // job actions by company
  // ----------------------------------------
  var view_by_company = new Keen.Query("count", {
    eventCollection: "job_action",
    groupBy: "jobCompany",
    interval: "daily",
    timeframe: "this_7_days",
    filters: [
        {
          "property_name" : "event",
          "operator" : "eq",
          "property_value" : "View Job" 
        }
    ]
  });
  client.draw(view_by_company, document.getElementById("chart-06"), {
    chartType: "columnchart",
    title: false,
    height: 250,
    width: "auto",
    chartOptions: {
      chartArea: {
        height: "75%",
        left: "10%",
        top: "5%",
        width: "60%"
      },
      bar: {
        groupWidth: "85%"
      },
      isStacked: true
    }
  });
  
  
  
  var apply_by_company = new Keen.Query("count", {
    eventCollection: "job_action",
    groupBy: "jobCompany",
    interval: "daily",
    timeframe: "this_7_days",
    filters: [
        {
          "property_name" : "event",
          "operator" : "eq",
          "property_value" : "Apply" 
        }
    ]
  });
  client.draw(apply_by_company, document.getElementById("chart-07"), {
    chartType: "columnchart",
    title: false,
    height: 250,
    width: "auto",
    chartOptions: {
      chartArea: {
        height: "75%",
        left: "10%",
        top: "5%",
        width: "60%"
      },
      bar: {
        groupWidth: "85%"
      },
      isStacked: true
    }
  });
  
  var action_by_company = new Keen.Query("count", {
    eventCollection: "job_action",
    groupBy: "event",
    timeframe: "this_7_days",
    interval: "daily",
    filters: [
        {
          "property_name" : "jobCompany",
          "operator" : "eq",
          "property_value" : "Northrup Grumman" 
        }
    ]
  });  
  client.draw(action_by_company, document.getElementById("chart-08"), {
    chartType: "columnchart",
    title: false,
    height: 250,
    width: "auto",
    chartOptions: {
      chartArea: {
        height: "75%",
        left: "10%",
        top: "5%",
        width: "60%"
      },
      bar: {
        groupWidth: "85%"
      },
      isStacked: true
    }
  });


});