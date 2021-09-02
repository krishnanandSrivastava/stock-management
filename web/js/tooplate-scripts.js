const width_threshold = 480;

function drawLineChart() {
  if ($("#lineChart").length) {
    ctxLine = document.getElementById("lineChart").getContext("2d");
    optionsLine = {
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Sales"
            }
          }
        ]
      }
    };

    // Set aspect ratio based on window width
    optionsLine.maintainAspectRatio =
      $(window).width() < width_threshold ? false : true;

    configLine = {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ],
        datasets: [
          {
            label: "Sales",
            data: [88, 68, 79, 57, 56, 55, 70,79, 57, 56, 55, 70],
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            lineTension: 0.1
          }
        ]
      },
      options: optionsLine
    };

    lineChart = new Chart(ctxLine, configLine);
  }
}

function drawBarChart() {
  if ($("#barChart").length) {
    ctxBar = document.getElementById("barChart").getContext("2d");

    optionsBar = {
      responsive: true,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            },
            scaleLabel: {
              display: true,
              labelString: "Sales"
            }
          }
        ]
      }
    };

    optionsBar.maintainAspectRatio =
      $(window).width() < width_threshold ? false : true;

    configBar = {
      type: "bar",
      data: {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"],
        datasets: [
          {
            label: "NoOfSales",
            data: [12, 19, 3, 5, 2, 3,30],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(118, 255, 0, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgb(118,255,0,1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: optionsBar
    };

    barChart = new Chart(ctxBar, configBar);
  }
}

function drawPieChart() {
  if ($("#pieChart").length) {
    ctxPie = document.getElementById("pieChart").getContext("2d");
    optionsPie = {
      responsive: true,
      maintainAspectRatio: false
    };

    configPie = {
      type: "pie",
      data: {
        datasets: [
          {
            data: [4600, 5400,3000,7000,3500],
            backgroundColor: [
              window.chartColors.purple,
              window.chartColors.green,
                window.chartColors.blue,
                window.chartColors.green,
                window.chartColors.red,
                window.chartColors.orange,
                window.chartColors.yellow,
              window.chartColors.purple,
              window.chartColors.green,
              window.chartColors.blue,
              window.chartColors.green,
              window.chartColors.red,
              window.chartColors.orange,
              window.chartColors.yellow,
              window.chartColors.purple,
              window.chartColors.green,
              window.chartColors.blue,
              window.chartColors.green,
              window.chartColors.red,
              window.chartColors.orange,
              window.chartColors.yellow,
              window.chartColors.purple,
              window.chartColors.green,
              window.chartColors.blue,
              window.chartColors.green,
              window.chartColors.red,
              window.chartColors.orange,
              window.chartColors.yellow,
              window.chartColors.purple,
              window.chartColors.green,
              window.chartColors.blue,
              window.chartColors.green,
              window.chartColors.red,
              window.chartColors.orange,
              window.chartColors.yellow
            ],
            label: "Inventory"
          }
        ],
        labels: ["Used: 4,600 GB", "Available: 5,400 GB"]
      },
      options: optionsPie
    };

    pieChart = new Chart(ctxPie, configPie);
  }
}

function updateChartOptions() {
  if ($(window).width() < width_threshold) {
    if (optionsLine) {
      optionsLine.maintainAspectRatio = false;
    }
    if (optionsBar) {
      optionsBar.maintainAspectRatio = false;
    }
  } else {
    if (optionsLine) {
      optionsLine.maintainAspectRatio = true;
    }
    if (optionsBar) {
      optionsBar.maintainAspectRatio = true;
    }
  }
}

function updateLineChart() {
  if (lineChart) {
    lineChart.options = optionsLine;
    lineChart.update();
  }
}

function updateBarChart() {
  if (barChart) {
    barChart.options = optionsBar;
    barChart.update();
  }
}

function reloadPage() {
  setTimeout(function() {
    window.location.reload();
  }); // Reload the page so that charts will display correctly
}

function drawCalendar() {
  if ($("#calendar").length) {
    $("#calendar").fullCalendar({
      height: 400,
      events: [
        {
          title: "Meeting",
          start: "2018-09-1",
          end: "2018-09-2"
        },
        {
          title: "Marketing trip",
          start: "2018-09-6",
          end: "2018-09-8"
        },
        {
          title: "Follow up",
          start: "2018-10-12"
        },
        {
          title: "Team",
          start: "2018-10-17"
        },
        {
          title: "Company Trip",
          start: "2018-10-25",
		  end: "2018-10-27"
        },
        {
          title: "Review",
          start: "2018-11-12"
        },
        {
          title: "Plan",
          start: "2018-11-18"
        }
      ],
      eventColor: "rgba(54, 162, 235, 0.4)"
    });
  }
}
//----------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------
function drawLineChart_thread(month) {
  if ($("#lineChart").length) {
    ctxLine = document.getElementById("lineChart").getContext("2d");
    optionsLine = {
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Sales"
            }
          }
        ]
      }
    };

    // Set aspect ratio based on window width
    optionsLine.maintainAspectRatio =
        $(window).width() < width_threshold ? false : true;

    configLine = {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],
        datasets: [
          {
            label: "Sales",
            data: month,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            lineTension: 0.1
          }
        ]
      },
      options: optionsLine
    };

    lineChart = new Chart(ctxLine, configLine);
  }
}

function drawBarChart_thread(week) {
  if ($("#barChart").length) {
    ctxBar = document.getElementById("barChart").getContext("2d");

    optionsBar = {
      responsive: true,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            },
            scaleLabel: {
              display: true,
              labelString: "Sales"
            }
          }
        ]
      }
    };

    optionsBar.maintainAspectRatio =
        $(window).width() < width_threshold ? false : true;

    configBar = {
      type: "bar",
      data: {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"],
        datasets: [
          {
            label: "NoOfSales",
            data:week,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(118, 255, 0, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgb(118,255,0,1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: optionsBar
    };

    barChart = new Chart(ctxBar, configBar);
  }
}

function drawPieChart_thread(vendorName,vendorData) {
  if ($("#pieChart").length) {
    ctxPie = document.getElementById("pieChart").getContext("2d");
    optionsPie = {
      responsive: true,
      maintainAspectRatio: false
    };

    configPie = {
      type: "pie",
      data: {
        datasets: [
          {
            data: vendorData,
            backgroundColor: [
              window.chartColors.purple,
              window.chartColors.green,
              window.chartColors.blue,
              window.chartColors.green,
              window.chartColors.red,
              window.chartColors.orange,
              window.chartColors.yellow,
              window.chartColors.purple,
              window.chartColors.green,
              window.chartColors.blue,
              window.chartColors.green,
              window.chartColors.red,
              window.chartColors.orange,
              window.chartColors.yellow,
              window.chartColors.purple,
              window.chartColors.green,
              window.chartColors.blue,
              window.chartColors.green,
              window.chartColors.red,
              window.chartColors.orange,
              window.chartColors.yellow,
              window.chartColors.purple,
              window.chartColors.green,
              window.chartColors.blue,
              window.chartColors.green,
              window.chartColors.red,
              window.chartColors.orange,
              window.chartColors.yellow,
              window.chartColors.purple,
              window.chartColors.green,
              window.chartColors.blue,
              window.chartColors.green,
              window.chartColors.red,
              window.chartColors.orange,
              window.chartColors.yellow
            ],
            label: "Inventory"
          }
        ],
        labels: vendorName
      },
      options: optionsPie
    };

    pieChart = new Chart(ctxPie, configPie);
  }
}
eel.expose(drawAllGraph)
function drawAllGraph(data) {
  drawLineChart_thread(data.month);
  drawBarChart_thread(data.week);
  drawPieChart_thread(data.vendorName , data.vendorData);
}
