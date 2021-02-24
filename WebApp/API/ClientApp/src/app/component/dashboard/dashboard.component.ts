import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/Services/user.service";
import { MasterData } from "src/app/Services/masterdata.service";
import Chart from "chart.js";
import { PolicyRenewalsNotificationsService } from "src/app/Services/PolicyRenewalsNotifications.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  topFiveSaleschart;
  requestStatusChart;
  salesTargetsChart;

  currentUserAggregations;
  reportiesAggregations;

  policyNotifications;

  serachParams = {
    startDate: new Date(),
    endDate: new Date()
  }

  rangeType = 'currentMonth';

  constructor(
    private userService: UserService,
    public masterData: MasterData,
    public notificationsService: PolicyRenewalsNotificationsService,
    private router: Router
  ) { }

  navigateTOPolicyList(userId) {
    this.router.navigate(['mypolicies'], { queryParams: { mode: "userPolicyList",  filterUser: userId} })
  }
  initSearchDates() {
    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    this.serachParams.startDate = new Date(y, m, 1);
    this.serachParams.endDate = new Date(y, m + 1, 0);
  }

  rangeTyeChanged(type) {
    if(type === 'currentMonth') {
      this.initSearchDates();
    } else if(type === 'customDateRange') {
      this.initSearchDates();
    }
  }
  ngOnInit(): void {
    this.initSearchDates();
    this.loadDashboardMetrics();
    this.loadNotifications();

    // Donut chart center text
    Chart.pluginService.register({
      beforeDraw: function (chart) {
        if (chart.config.options.elements.center) {
          // Get ctx from string
          var ctx = chart.chart.ctx;

          // Get options from the center object in options
          var centerConfig = chart.config.options.elements.center;
          var fontStyle = centerConfig.fontStyle || 'Arial';
          var txt = centerConfig.text;
          var color = centerConfig.color || '#000';
          var maxFontSize = centerConfig.maxFontSize || 75;
          var sidePadding = centerConfig.sidePadding || 20;
          var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
          // Start with a base font of 30px
          ctx.font = "30px " + fontStyle;

          // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
          var stringWidth = ctx.measureText(txt).width;
          var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

          // Find out how much the font can grow in width.
          var widthRatio = elementWidth / stringWidth;
          var newFontSize = Math.floor(30 * widthRatio);
          var elementHeight = (chart.innerRadius * 2);

          // Pick a new font size so it will not be larger than the height of label.
          var fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
          var minFontSize = centerConfig.minFontSize;
          var lineHeight = centerConfig.lineHeight || 25;
          var wrapText = false;

          if (minFontSize === undefined) {
            minFontSize = 20;
          }

          if (minFontSize && fontSizeToUse < minFontSize) {
            fontSizeToUse = minFontSize;
            wrapText = true;
          }

          // Set font settings to draw it correctly.
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
          var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
          ctx.font = fontSizeToUse + "px " + fontStyle;
          ctx.fillStyle = color;

          if (!wrapText) {
            ctx.fillText(txt, centerX, centerY);
            return;
          }

          var words = txt.split(' ');
          var line = '';
          var lines = [];

          // Break words up into multiple lines if necessary
          for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = ctx.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > elementWidth && n > 0) {
              lines.push(line);
              line = words[n] + ' ';
            } else {
              line = testLine;
            }
          }

          // Move the center up depending on line height and number of lines
          centerY -= (lines.length / 2) * lineHeight;

          for (var n = 0; n < lines.length; n++) {
            ctx.fillText(lines[n], centerX, centerY);
            centerY += lineHeight;
          }
          //Draw text in center
          ctx.fillText(line, centerX, centerY);
        }
      }
    });
  }

  loadNotifications() {
    this.notificationsService.GetPolicyRenewalNotificationByCriteria().subscribe(data => {
      this.policyNotifications = data;
    })
  }

  ngAfterViewInit() {
    this.topFiveSaleschart = new Chart(
      document.getElementById("top-five-sales-chart"),
      {
        type: "bar",
        data: {
          labels: ["Hari", "Praveen", "Krishna", "Banu", "Sharath"],
          datasets: [
            {
              label: "Current Month Sales",
              backgroundColor: [
                "#3e95cd",
                "#8e5ea2",
                "#3cba9f",
                "#e8c3b9",
                "#c45850",
              ],
              data: [2478, 5267, 734, 784, 433],
            },
          ],
        },
        options: {
          legend: { display: false },
          title: {
            display: false,
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  drawOnChartArea: false,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  drawOnChartArea: false,
                },
                ticks: {
                  display: false,
                },
                display: false,
              },
            ],
          },
        },
      }
    );

    this.requestStatusChart = new Chart(
      document.getElementById("request-status"),
      {
        type: "pie",
        data: {
          labels: [
            "Draft",
            "Submitted",
            "Payment Link Sent",
            "Mapped",
            "Mapped Approved",
            "Mapped Rejected",
          ],
          datasets: [
            {
              backgroundColor: [
                "#3e95cd",
                "#8e5ea2",
                "#3cba9f",
                "#e8c3b9",
                "#c45850",
              ],
              data: [30, 80, 20, 50, 25, 10],
            },
          ],
        },
        options: {
          title: {
            display: false,
          },
          legend: {
            display: false,
          },
          cutoutPercentage: 65,
          // elements: {
          //   center: {
          //     text: "Red is 2/3 of the total numbers",
          //     color: "#FF6384", // Default is #000000
          //     fontStyle: "Arial", // Default is Arial
          //     sidePadding: 20, // Default is 20 (as a percentage)
          //     minFontSize: 25, // Default is 20 (in px), set to false and text will not wrap.
          //     lineHeight: 25 // Default is 25 (in px), used for when text wraps
          //   }
          // }
        },
      }
    );
    // ------------------------------------------------------------

    this.salesTargetsChart = new Chart(
      document.getElementById("sales-targets"),
      {
        type: "horizontalBar",
        data: {
          labels: ["Hari", "Praveen", "Krishna Mahohar", "Banu", "Sharath", "Hari", "Praveen", "Krishna", "Banu", "Sharath"],

          datasets: [
            {
              data: [30, 60, 50, 45, 25, 30, 60, 50, 45, 25],
              backgroundColor: "#3cba9f",
            },
            {
              data: [70, 40, 50, 55, 75, 70, 40, 50, 55, 75],
              backgroundColor: "#c45850",
            }
          ],
        },

        options: {
          tooltips: {
            enabled: false,
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  display: false
                },
                stacked: true,
              },
            ],
            yAxes: [
              {
                gridLines: {
                  display: false,
                  color: "#fff",
                  zeroLineColor: "#fff",
                  zeroLineWidth: 0,
                },
                ticks: {
                  fontFamily: "'Open Sans Bold', sans-serif",
                  fontSize: 11,
                },
                stacked: true,
              },
            ],
          },
          legend: {
            display: false,
          },

          pointLabelFontFamily: "Quadon Extra Bold",
          scaleFontFamily: "Quadon Extra Bold",
        },
      }
    );
  }

  loadDashboardMetrics() {
    this.userService.GetPolicyAggregationsByUserReporties(this.serachParams).subscribe((data: any) => {
      console.log(data);
      const currentUserIndex = data.findIndex(d => d.id === this.userService.loggedInUser.id);
      this.currentUserAggregations = data[currentUserIndex];
      data.splice(currentUserIndex, 1);
      data.sort((a, b) => {
        return b.grossPremium - a.grossPremium;
      });
      this.reportiesAggregations = data;
    })
  }

  refreshNotification() {
    this.notificationsService.RefreshNotifications().subscribe(data => {
      this.loadNotifications();
    })
  }

  dismissNotification(notification) {
    this.notificationsService.UpdateNotificationStatus([notification.id], 3).subscribe(data => {
      this.loadNotifications();
    })
  }
}
