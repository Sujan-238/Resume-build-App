package com.resumeforge.app;

import com.getcapacitor.BridgeActivity;

import android.os.Bundle;
import android.webkit.WebSettings;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        WebSettings settings = this.bridge.getWebView().getSettings();
        // Enable JavaScript to open windows (Required for Razorpay UPI/Scanner)
        settings.setJavaScriptCanOpenWindowsAutomatically(true);
        // Enable support for multiple windows (Critical for Razorpay UPI apps)
        settings.setSupportMultipleWindows(true);
    }
}
