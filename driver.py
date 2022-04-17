import numpy as np
import cv2 as cv
from matplotlib import pyplot as plt

#def main(input):
img = cv.imread("finaltest.png" ,0)
e = cv.Canny(img, 100, 200)
edges = cv.Canny(img,100,200)

print(type(edges))
height = edges.shape[0]
length = edges.shape[1]
m = length/2

crop = edges[0:int(height), int(m-(m/3)):int(m+(m/3))] 
cropcolor = cv.cvtColor(img, cv.COLOR_GRAY2RGB)
cropcolor = img[0:int(height), int(m-(m/3)):int(m+(m/3))] 
cv.imshow("Original", cv.imread("finaltest_.png"))
#cv.imshow('cropped', crop)


img = cv.imread("finaltest.png")
gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
edges = cv.Canny(gray, 75, 150)
    
severity = -1
severitytext = "und"

contours, _= cv.findContours(crop, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)
for c in contours:
    rect = cv.minAreaRect(c)
    (x, y), (width, height), angle = rect
    aspect_ratio = min(width, height)/ max(width, height)
    #thresh = cv.threshold(crop, 120, 255, cv.THRESH_BINARY)
    thresh = 0.272

    
    if(aspect_ratio > thresh):
        for pt in contours:
            cv.drawContours(cropcolor, [pt], 0, (0, 255, 0), 5)

        lines = cv.HoughLinesP(crop, 1, np.pi/180, 30, maxLineGap=250)
        count = 0
        slope = 0

        for line in lines:
            x1, y1, x2, y2 = line[0]
            cv.line(cropcolor, (x1, y1), (x2, y2), (0, 0, 128), 1)
            slope = abs((y1-y2)/(x1-x2))
            #print(str(slope))
            count += 1
            #print(str(slope) + " " + "WHEEEEE")


        if(slope > 17.5):
            severity = 0
            severitytext = "Back is fine, no need for the Scolio Scholars"

        if(slope < 17.5 and slope > 11.5):
            severity = 1
            severitytext = "Mild scoliosis detected"

        if(slope < 11.5 and slope > 6.0):
            severity = 2
            severitytext = "Moderate scoliosis detected"

        if(slope < 6.0):
            severity = 3
            severitytext = "Severe scoliosiss detected, please get immediate help"    



    elif(aspect_ratio < thresh):
        for pt in contours:
            cv.drawContours(cropcolor, [pt], 0, (0, 0, 255), 5)
            severity = 3
            severitytext = "Severe scoliosiss detected, please get immediate help"

        
print(severitytext)    
cv.imshow("Edge Detected Image", crop)
cv.imshow("Lines Detected", cropcolor)
cv.waitKey(0)
    

