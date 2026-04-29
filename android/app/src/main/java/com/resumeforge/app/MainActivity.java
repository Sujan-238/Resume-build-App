package com.resumeforge.app;

import com.getcapacitor.BridgeActivity;

import android.os.Bundle;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Enable JavaScript to open windows automatically (Required for Razorpay UPI/Scanner)
        this.bridge.getWebView().getSettings().setJavaScriptCanOpenWindowsAutomatically(true);
    }
}
